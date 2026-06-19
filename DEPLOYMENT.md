# Deployment Guide — ritmeLab Website

Complete step-by-step guide to deploy the ritmeLab website to a production VPS.

## Prerequisites

- **VPS:** Ubuntu 24.04 LTS (or similar Debian-based system)
- **Domain:** ritmelab.io configured to point to your VPS IP
- **SSH Access:** Root or sudo-enabled user account
- **Database:** PostgreSQL installed (or will be installed)

## Step 1: Initial Server Setup

Connect to your VPS:

```bash
ssh root@your-vps-ip
```

Update system packages:

```bash
apt update && apt upgrade -y
```

Set up a non-root user (optional but recommended):

```bash
adduser deploy
usermod -aG sudo deploy
su - deploy
```

## Step 2: Install System Dependencies

Install Node.js 20:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Verify: should be v20.x.x
```

Install PostgreSQL:

```bash
sudo apt install -y postgresql postgresql-contrib
```

Install Nginx:

```bash
sudo apt install -y nginx
```

Install PM2 (globally):

```bash
sudo npm install -g pm2
```

Install Certbot for SSL:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

## Step 3: Configure PostgreSQL

Start PostgreSQL:

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Create database and user:

```bash
sudo -u postgres psql
```

Inside psql prompt:

```sql
CREATE DATABASE ritmelab;
CREATE USER ritmelab_user WITH PASSWORD 'strong-password-here';
ALTER ROLE ritmelab_user SET client_encoding TO 'utf8';
ALTER ROLE ritmelab_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE ritmelab_user SET default_transaction_deferrable TO on;
ALTER ROLE ritmelab_user SET default_transaction_read_only TO off;
ALTER ROLE ritmelab_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE ritmelab TO ritmelab_user;
ALTER ROLE ritmelab_user CREATEDB;
\q
```

## Step 4: Set Up Application Directory

Create application directory:

```bash
sudo mkdir -p /var/www/ritmelab-website
sudo chown $USER:$USER /var/www/ritmelab-website
cd /var/www/ritmelab-website
```

Clone repository:

```bash
git clone https://github.com/2142kk/ritmelab-website.git .
```

Install dependencies:

```bash
npm install
# or
pnpm install
```

## Step 5: Configure Environment Variables

Create `.env.local` with production values:

```bash
cp .env.local.example .env.local
nano .env.local
```

Update with your production values:

```env
# Database
DATABASE_URL=postgresql://ritmelab_user:strong-password-here@localhost:5432/ritmelab

# Auth
NEXTAUTH_SECRET=generate-secure-random-string-here
NEXTAUTH_URL=https://ritmelab.io

# Email
RESEND_API_KEY=your-actual-resend-api-key
RESEND_FROM=hello@ritmelab.io
NOTIFICATION_EMAIL=hello@ritmelab.io

# Upload
UPLOAD_DIR=/var/www/ritmelab-website/public/uploads
NEXT_PUBLIC_UPLOAD_URL=/uploads
```

Generate secure `NEXTAUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 6: Run Database Migrations

Create `/uploads` directory:

```bash
mkdir -p public/uploads
chmod 755 public/uploads
```

Run migrations:

```bash
psql -U ritmelab_user -d ritmelab < db/migrations/001_initial.sql
```

Seed initial data:

```bash
psql -U ritmelab_user -d ritmelab < db/seed.sql
```

## Step 7: Build Next.js Application

Build for production:

```bash
npm run build
```

This creates an optimized production build in `.next/` directory.

## Step 8: Start Application with PM2

Copy PM2 configuration:

```bash
cp ecosystem.config.js ecosystem.config.js
```

Start application:

```bash
pm2 start ecosystem.config.js --env production
```

Verify it's running:

```bash
pm2 status
pm2 logs ritmelab-website
```

Set up PM2 to start on boot:

```bash
pm2 startup
pm2 save
```

Copy the output from `pm2 startup` and run it to enable auto-start.

## Step 9: Configure Nginx

Copy Nginx configuration:

```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/ritmelab
sudo ln -s /etc/nginx/sites-available/ritmelab /etc/nginx/sites-enabled/
```

Update the configuration with your paths:

```bash
sudo nano /etc/nginx/sites-available/ritmelab
```

Change:
- `alias /home/user/ritmelab-website/.next/static/` → your actual path
- Verify SSL certificate paths

Test Nginx configuration:

```bash
sudo nginx -t
```

Reload Nginx:

```bash
sudo systemctl reload nginx
sudo systemctl enable nginx
```

## Step 10: Set Up SSL Certificate

Request SSL certificate with Certbot:

```bash
sudo certbot --nginx -d ritmelab.io -d www.ritmelab.io
```

Follow the prompts. Certbot will automatically update your Nginx configuration.

Verify SSL certificate:

```bash
sudo certbot certificates
```

Test auto-renewal:

```bash
sudo certbot renew --dry-run
```

## Step 11: Create Uploads Directory with Permissions

Set up uploads directory:

```bash
sudo mkdir -p /var/www/ritmelab-website/public/uploads
sudo chown www-data:www-data /var/www/ritmelab-website/public/uploads
sudo chmod 755 /var/www/ritmelab-website/public/uploads
```

## Step 12: Set Up Firewall (UFW)

Enable firewall:

```bash
sudo ufw enable
```

Allow SSH, HTTP, HTTPS:

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

## Verification

Test your deployment:

1. **Homepage:** https://ritmelab.io
2. **Admin Login:** https://ritmelab.io/admin/login
   - Email: admin@ritmelab.io
   - Password: admin123 (change immediately!)
3. **Contact Form:** Submit test message
4. **Contact Email:** Verify you receive email notification
5. **Case Studies:** Should display from database
6. **Dark Mode:** Toggle theme

## Maintenance

### Logs

View application logs:

```bash
pm2 logs ritmelab-website
```

View Nginx logs:

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Database Backups

Create backup:

```bash
pg_dump -U ritmelab_user ritmelab > /backups/ritmelab-$(date +%Y%m%d).sql
```

### Updates

Pull latest changes:

```bash
cd /var/www/ritmelab-website
git pull origin master
npm install
npm run build
pm2 restart ritmelab-website
```

### Database Migrations

For future database migrations:

```bash
psql -U ritmelab_user -d ritmelab < db/migrations/002_new-migration.sql
```

## Troubleshooting

### Application won't start

Check PM2 logs:

```bash
pm2 logs ritmelab-website --err
```

Verify environment variables:

```bash
pm2 env ritmelab-website
```

### Database connection error

Test connection:

```bash
psql -U ritmelab_user -d ritmelab -c "SELECT 1"
```

Verify DATABASE_URL in `.env.local`

### Nginx 502 Bad Gateway

Check if Next.js is running:

```bash
pm2 status
```

Check if port 3000 is listening:

```bash
sudo lsof -i :3000
```

### SSL certificate issues

Renew certificate:

```bash
sudo certbot renew --force-renewal
```

Check certificate status:

```bash
sudo certbot certificates
```

## Security Checklist

- [ ] Change admin password: https://ritmelab.io/admin/settings
- [ ] Update `.env.local` with production secrets
- [ ] Enable firewall (UFW)
- [ ] Configure regular backups
- [ ] Set up monitoring/alerting
- [ ] Test SSL certificate (https://www.ssllabs.com/)
- [ ] Update system packages regularly
- [ ] Review PM2 logs for errors
- [ ] Test email notifications
- [ ] Verify file upload permissions

## Performance Optimization

### Enable gzip compression

Already configured in `nginx.conf.example`

### Set cache headers

Already configured for static files (30 days) and Next.js assets (1 year)

### Monitor memory usage

```bash
pm2 monit
```

### Database optimization

```bash
sudo -u postgres vacuumdb ritmelab
```

## Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Reverse Proxy](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- [PostgreSQL Backup](https://www.postgresql.org/docs/current/backup.html)
- [Certbot Documentation](https://certbot.eff.org/)

## Support

For deployment issues, contact:

**Email:** hello@ritmelab.io

---

**Last Updated:** June 2026

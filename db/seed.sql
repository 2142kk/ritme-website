-- Admin user (password: admin123)
-- Hash generated with bcrypt: $2b$10$TUJILpP.pQvTu/F85OzDKeKbNaWWLliFBvCX5Kzr7xWBbvE0EjRY2
INSERT INTO admin_users (email, password_hash) VALUES
('admin@ritmelab.io', '$2b$10$TUJILpP.pQvTu/F85OzDKeKbNaWWLliFBvCX5Kzr7xWBbvE0EjRY2');

-- Case Studies
INSERT INTO case_studies (industry, title, description, outcome, display_order, is_published) VALUES
(
  'Mining & Heavy Industry',
  'From Reactive to Resilient',
  'A coal mining contractor managing heavy equipment across remote sites with no centralized system. Maintenance was purely reactive, asset visibility was nonexistent, and unplanned downtime was eating into margins with no way to predict or prevent it.',
  'Enterprise asset management deployed across operations. Full equipment lifecycle visibility, scheduled maintenance workflows, and real-time tracking — turning downtime from a surprise into a managed variable.',
  1,
  true
),
(
  'Retail & Distribution',
  'One System, Many Brands',
  'A portfolio of multi-brand retail and distribution businesses running on disconnected systems — inventory was inaccurate, sales data was siloed per store, and scaling to new locations meant multiplying the chaos.',
  'Unified retail management system across brands and locations. Centralized inventory, real-time sales visibility, and an operational foundation built to scale without adding complexity.',
  2,
  true
),
(
  'Medical Equipment Manufacturing',
  'Built to Comply, Built to Scale',
  'A medical equipment manufacturer running their entire operation on spreadsheets. Production scheduling was manual, quality control had no traceability, and the business was growing faster than their processes could handle.',
  'Full ERP implementation from the ground up. End-to-end production tracking, automated quality workflows, and compliance-ready operations — giving the business the infrastructure to grow with confidence.',
  3,
  true
);

-- Products
INSERT INTO products (name, tagline, description, status, link, display_order, is_published) VALUES
(
  'Qrazey',
  'QR codes that work harder',
  'An affordable QR code platform built for emerging markets. Generate, customize, and track QR codes — from simple URLs to rich product pages, vCards, and social profiles.',
  'available',
  '/products/qrazey',
  1,
  true
),
(
  'ritmeERP',
  'Enterprise resource planning, built for the way you actually work',
  NULL,
  'coming_soon',
  NULL,
  2,
  true
),
(
  'Sadhe',
  'Unified omnichannel retail management for Indonesian SMEs',
  NULL,
  'coming_soon',
  NULL,
  3,
  true
),
(
  'Damel',
  'GPS-verified field CRM with WhatsApp-first communication',
  NULL,
  'coming_soon',
  NULL,
  4,
  true
),
(
  'Dokem',
  'Document management with e-signature and e-Meterai compliance',
  NULL,
  'coming_soon',
  NULL,
  5,
  true
),
(
  'Sukha',
  'Property and rental management for modern landlords',
  NULL,
  'coming_soon',
  NULL,
  6,
  true
);

-- Site Content
INSERT INTO site_content (section, key, value, is_published) VALUES
(
  'hero',
  'headline',
  'We don''t build software. We build futures.',
  true
),
(
  'footer',
  'email',
  'hello@ritmelab.io',
  true
);

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import db from '@/lib/db'

const fallbackProducts = [
  {
    id: '1',
    name: 'Qrazey',
    tagline: 'QR codes that work harder',
    description:
      'An affordable QR code platform built for emerging markets. Generate, customize, and track QR codes — from simple URLs to rich product pages, vCards, and social profiles.',
    status: 'available',
    link: '/products/qrazey',
    display_order: 1,
  },
  {
    id: '2',
    name: 'ritmeERP',
    tagline: 'Enterprise resource planning, built for the way you actually work',
    description: null,
    status: 'coming_soon',
    link: null,
    display_order: 2,
  },
  {
    id: '3',
    name: 'Sadhe',
    tagline: 'Unified omnichannel retail management for Indonesian SMEs',
    description: null,
    status: 'coming_soon',
    link: null,
    display_order: 3,
  },
  {
    id: '4',
    name: 'Damel',
    tagline: 'GPS-verified field CRM with WhatsApp-first communication',
    description: null,
    status: 'coming_soon',
    link: null,
    display_order: 4,
  },
  {
    id: '5',
    name: 'Dokem',
    tagline: 'Document management with e-signature and e-Meterai compliance',
    description: null,
    status: 'coming_soon',
    link: null,
    display_order: 5,
  },
  {
    id: '6',
    name: 'Sukha',
    tagline: 'Property and rental management for modern landlords',
    description: null,
    status: 'coming_soon',
    link: null,
    display_order: 6,
  },
]

async function getProducts() {
  try {
    const result = await db.query(
      'SELECT * FROM products WHERE is_published = true ORDER BY display_order ASC'
    )
    return result.rows.length > 0 ? result.rows : fallbackProducts
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return fallbackProducts
  }
}

export default async function Products() {
  const products = await getProducts()

  // Separate featured (Qrazey) from the rest
  const featured = products.find((p) => p.status === 'available')
  const comingSoon = products.filter((p) => p.status !== 'available')

  return (
    <section id="products" className="relative w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-muted-foreground font-mono">[05]</span>
            <span className="text-sm text-muted-foreground">What we've built</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-balance">
            What We've
            <br />
            <span className="text-muted-foreground">Built.</span>
          </h2>
        </div>

        <div className="space-y-8">
          {/* Featured Product */}
          {featured && (
            <Link href={featured.link || '#'}>
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 border border-primary/20">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-semibold mb-2 tracking-tight">
                      {featured.name}
                    </h3>
                    <p className="text-lg text-muted-foreground">{featured.tagline}</p>
                  </div>
                  <Badge className="whitespace-nowrap">Available Now</Badge>
                </div>
                {featured.description && (
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {featured.description}
                  </p>
                )}
                <div className="mt-6 text-sm font-semibold text-primary group-hover:translate-x-2 transition-transform">
                  Explore →
                </div>
              </div>
            </Link>
          )}

          {/* Coming Soon Products Grid */}
          {comingSoon.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Coming Soon</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comingSoon.map((product) => (
                  <div
                    key={product.id}
                    className="p-6 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold tracking-tight flex-1">{product.name}</h3>
                      <Badge variant="outline" className="whitespace-nowrap ml-2">
                        Coming Soon
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

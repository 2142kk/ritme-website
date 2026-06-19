import Header from '@/components/header'
import Footer from '@/components/footer'
import { ArrowRight, QrCode, Palette, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Qrazey - QR Codes That Work Harder',
  description:
    'Affordable, powerful QR code generation built for emerging markets. Free for personal use. Seriously affordable for business.',
}

export default function QrazeyPage() {
  return (
    <main className="w-full">
      <Header scrollY={0} />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-32">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-secondary/50 border border-border">
            <span className="text-sm font-medium text-muted-foreground">A ritmeLab Product</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.05] tracking-tight mb-8 text-balance">
            QR codes that
            <br />
            <span className="text-muted-foreground">work harder</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Affordable, powerful QR code generation built for emerging markets. Free for personal use. Seriously
            affordable for business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#"
              className="px-6 py-3 text-sm font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
            >
              Get Started Free
            </Link>
            <Link
              href="#pricing"
              className="px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              View Pricing
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-8">No credit card required</p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-border to-transparent" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full py-32 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-balance mb-6">
              Everything you need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features built for businesses of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Generate */}
            <div className="p-8 rounded-2xl bg-background border border-border hover:border-foreground/50 transition-colors duration-300">
              <QrCode className="w-12 h-12 mb-6 text-primary" />
              <h3 className="text-2xl font-semibold mb-4 tracking-tight">Generate</h3>
              <p className="text-muted-foreground leading-relaxed">
                Website URLs, vCards, WhatsApp, social profiles, WiFi, location, calendar events, and more. Every type
                you need, in one place.
              </p>
            </div>

            {/* Customize */}
            <div className="p-8 rounded-2xl bg-background border border-border hover:border-foreground/50 transition-colors duration-300">
              <Palette className="w-12 h-12 mb-6 text-primary" />
              <h3 className="text-2xl font-semibold mb-4 tracking-tight">Customize</h3>
              <p className="text-muted-foreground leading-relaxed">
                Colors, gradients, logos, frames, and patterns. Make every QR code look like it belongs to your brand.
              </p>
            </div>

            {/* Track */}
            <div className="p-8 rounded-2xl bg-background border border-border hover:border-foreground/50 transition-colors duration-300">
              <BarChart3 className="w-12 h-12 mb-6 text-primary" />
              <h3 className="text-2xl font-semibold mb-4 tracking-tight">Track</h3>
              <p className="text-muted-foreground leading-relaxed">
                Know when, where, and how your QR codes are scanned. Geographic data, device types, and time patterns
                for paid users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative w-full py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-balance mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free, scale affordably
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="p-8 rounded-2xl bg-secondary/30 border border-border flex flex-col">
              <h3 className="text-2xl font-semibold mb-2 tracking-tight">Free</h3>
              <p className="text-muted-foreground mb-6">Personal use</p>

              <div className="mb-8">
                <div className="text-4xl font-bold mb-2">$0</div>
                <p className="text-sm text-muted-foreground">Forever free</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Static QR codes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Basic customization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Basic scan count</span>
                </li>
              </ul>

              <button className="w-full py-3 px-4 rounded-full border border-border hover:bg-secondary transition-colors font-semibold">
                Get Started
              </button>
            </div>

            {/* Pay-as-you-go */}
            <div className="p-8 rounded-2xl bg-primary/10 border border-primary/50 flex flex-col ring-1 ring-primary/20">
              <h3 className="text-2xl font-semibold mb-2 tracking-tight">Pay-as-you-go</h3>
              <p className="text-muted-foreground mb-6">For one-time needs</p>

              <div className="mb-8">
                <div className="text-4xl font-bold mb-2">Affordable</div>
                <p className="text-sm text-muted-foreground">Per-QR pricing, no subscriptions</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Everything in Free</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Dynamic QR codes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Advanced analytics</span>
                </li>
              </ul>

              <button className="w-full py-3 px-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2">
                Create QR Code <ArrowRight size={16} />
              </button>
            </div>

            {/* Business */}
            <div className="p-8 rounded-2xl bg-secondary/30 border border-border flex flex-col">
              <h3 className="text-2xl font-semibold mb-2 tracking-tight">Business</h3>
              <p className="text-muted-foreground mb-6">For teams</p>

              <div className="mb-8">
                <div className="text-4xl font-bold mb-2">Custom</div>
                <p className="text-sm text-muted-foreground">Unlimited everything</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Everything in Pay-as-you-go</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Unlimited dynamic QR codes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">API access</span>
                </li>
              </ul>

              <button className="w-full py-3 px-4 rounded-full border border-border hover:bg-secondary transition-colors font-semibold">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-32 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-balance mb-8">
            Ready to create your first QR code?
          </h2>

          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
          >
            Get Started Free <ArrowRight size={16} />
          </Link>

          <p className="text-sm text-muted-foreground mt-6">No credit card required</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}

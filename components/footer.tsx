"use client"

import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-medium tracking-tight mb-4">ritmeLab</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">We build futures.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#work" className="text-muted-foreground hover:text-foreground transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Approach */}
          <div>
            <h4 className="text-sm font-medium mb-6">Approach</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#approach" className="text-muted-foreground hover:text-foreground transition-colors">
                  How We Think
                </Link>
              </li>
              <li>
                <Link href="#process" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="#work" className="text-muted-foreground hover:text-foreground transition-colors">
                  Selected Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium mb-6">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hello@ritmeLab.io"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  hello@ritmeLab.io
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} ritmeLab. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

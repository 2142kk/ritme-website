"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  scrollY: number
}

export default function Header({ scrollY }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity">
          ritmeLab
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="#approach" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Approach
          </Link>
          <Link href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Process
          </Link>
          <Link href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Work
          </Link>
          <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>

        <div className="hidden md:block">
          <Link
            href="#contact"
            className="px-5 py-2.5 text-sm font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
          >
            Start a conversation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="#approach"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Approach
            </Link>
            <Link
              href="#process"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Process
            </Link>
            <Link
              href="#work"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              href="#contact"
              className="block px-5 py-2.5 text-sm font-semibold rounded-full bg-foreground text-background text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start a conversation
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

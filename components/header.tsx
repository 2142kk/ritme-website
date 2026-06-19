"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

const navLinks = [
  { href: "/#approach", label: "Approach" },
  { href: "/#process", label: "Process" },
  { href: "/#products", label: "Products" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
]

interface HeaderProps {
  scrollY: number
}

export default function Header({ scrollY }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Intersection Observer to detect active section
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("/#", ""))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const navLinkClass = (href: string) => {
    const isActive = activeSection === href.replace("/#", "")
    return `text-sm transition-colors ${
      isActive
        ? "text-foreground font-bold"
        : "text-muted-foreground font-normal hover:text-foreground"
    }`
  }

  const mobileNavLinkClass = (href: string) => {
    const isActive = activeSection === href.replace("/#", "")
    return `block text-sm transition-colors ${
      isActive
        ? "text-foreground font-bold"
        : "text-muted-foreground font-normal hover:text-foreground"
    }`
  }

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
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <Link
            href="/#contact"
            className="px-5 py-2.5 text-sm font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
          >
            Start a conversation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 space-y-4">
            {navLinks.slice(0, -1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={mobileNavLinkClass(link.href)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
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

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Hero() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setOpacity(1)
  }, [])

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      <div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center transition-opacity duration-1000"
        style={{ opacity }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.05] tracking-tight mb-8 text-balance">
          We don't build software.
          <br />
          <span className="text-muted-foreground">We build futures.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          From spreadsheets to enterprise systems. Manual operations to intelligent automation.
          <br className="hidden md:block" />
          Whatever you bring to the table, we transform it with intelligence and intent.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#contact"
            className="px-6 py-3 text-sm font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
          >
            Start a conversation
          </Link>
          <Link
            href="#work"
            className="px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            View select work
          </Link>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  )
}

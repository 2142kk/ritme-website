"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Solutions from "@/components/solutions"
import DeliveryRhythm from "@/components/delivery-rhythm"
import CaseStudies from "@/components/case-studies"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="w-full">
      <Header scrollY={scrollY} />
      <Hero />
      <Solutions />
      <DeliveryRhythm />
      <CaseStudies />
      <Contact />
      <Footer />
    </main>
  )
}

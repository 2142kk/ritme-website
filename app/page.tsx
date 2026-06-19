import Header from "@/components/header"
import HeaderClient from "@/components/header-client"
import Hero from "@/components/hero"
import Solutions from "@/components/solutions"
import DeliveryRhythm from "@/components/delivery-rhythm"
import Products from "@/components/products"
import CaseStudies from "@/components/case-studies"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full">
      <HeaderClient />
      <Hero />
      <Solutions />
      <DeliveryRhythm />
      <Products />
      <CaseStudies />
      <Contact />
      <Footer />
    </main>
  )
}

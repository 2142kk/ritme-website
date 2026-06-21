import db from "@/lib/db"
import HeroClient from "./hero-client"

async function getHeroContent() {
  try {
    const result = await db.query(
      `SELECT key, value FROM site_content
       WHERE section = 'hero' AND is_published = true`
    )

    const content: Record<string, string> = {}
    result.rows.forEach((row) => {
      content[row.key] = row.value
    })

    return {
      headline:
        content.headline || "Every great operation runs on rhythm.",
      subheadline:
        content.subheadline ||
        "We work with enterprises, sports teams, entertainment acts, communities, and independent operators — anyone serious about replacing chaos with systems that actually work.",
    }
  } catch (error) {
    console.error("Failed to fetch hero content:", error)
    return {
      headline: "Every great operation runs on rhythm.",
      subheadline:
        "We work with enterprises, sports teams, entertainment acts, communities, and independent operators — anyone serious about replacing chaos with systems that actually work.",
    }
  }
}

export default async function Hero() {
  const { headline, subheadline } = await getHeroContent()

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      <HeroClient headline={headline} subheadline={subheadline} />

    </section>
  )
}

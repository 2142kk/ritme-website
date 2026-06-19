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
        content.headline || "We don't build software. We build futures.",
      subheadline:
        content.subheadline ||
        "From spreadsheets to enterprise systems. Manual operations to intelligent automation. Whatever you bring to the table, we transform it with intelligence and intent.",
    }
  } catch (error) {
    console.error("Failed to fetch hero content:", error)
    return {
      headline: "We don't build software. We build futures.",
      subheadline:
        "From spreadsheets to enterprise systems. Manual operations to intelligent automation. Whatever you bring to the table, we transform it with intelligence and intent.",
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

import db from "@/lib/db"

const fallbackApproaches = [
  {
    number: "01",
    title: "Understand First",
    description:
      "We start with your operation, not a product pitch. Before anything is built, we learn how you work, where the friction is, and what better actually means for you.",
  },
  {
    number: "02",
    title: "Scope What's Needed",
    description:
      "Not every problem needs a six-month engagement. We'll tell you honestly what it would take to fix what's broken — and whether it's even worth fixing right now. No overselling, no unnecessary complexity.",
  },
  {
    number: "03",
    title: "Build to Fit",
    description:
      "Off-the-shelf tools are built for everyone, which means they're optimised for no one. We build systems shaped around how you actually operate — whether you're managing a supply chain or a sold-out show.",
  },
  {
    number: "04",
    title: "Grow With You",
    description:
      "When your operation changes, your system should adapt. We build for where you're going, not just where you are.",
  },
]

async function getApproachCards() {
  try {
    const result = await db.query(
      `SELECT key, value FROM site_content
       WHERE section = 'approach' AND is_published = true
       ORDER BY key`
    )
    const raw: Record<string, string> = {}
    result.rows.forEach((row) => { raw[row.key] = row.value })

    const cards = [1, 2, 3, 4].map((n, i) => ({
      number: `0${n}`,
      title: raw[`card_${n}_title`] || fallbackApproaches[i].title,
      description: raw[`card_${n}_description`] || fallbackApproaches[i].description,
    }))

    return cards.some((c) => c.title) ? cards : fallbackApproaches
  } catch {
    return fallbackApproaches
  }
}

export default async function Solutions() {
  const approaches = await getApproachCards()

  return (
    <section id="approach" className="relative w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-muted-foreground font-mono">[01]</span>
            <span className="text-sm text-muted-foreground">How we work</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-balance">
            Honest work,
            <br />
            <span className="text-muted-foreground">real fit.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {approaches.map((approach, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
            >
              <div className="text-sm text-muted-foreground font-mono mb-4">{approach.number}</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 tracking-tight">{approach.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{approach.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import db from "@/lib/db"

const fallbackCases = [
  {
    id: "1",
    title: "From Spreadsheets to ISO Compliance",
    industry: "Industrial Distribution",
    description:
      "An ISO 9001:2015-certified distribution company for industrial tools managed everything through Google Docs and Sheets. Quality management, inventory, procurement — all fragmented. Audit trails were manual. Compliance was a constant risk.",
    outcome:
      "Custom ERP fully aligned with ISO 9001:2015 standards. Automated quality management. Real-time inventory visibility. Compliance by design, not documentation.",
    image_url: "/industrial-warehouse-erp-system-dashboard.jpg",
    display_order: 1,
  },
  {
    id: "2",
    title: "Manual to Integrated",
    industry: "Medical Equipment Manufacturing",
    description:
      "A medical equipment manufacturer running on manual processes, paper-based workflows, and disconnected systems. Production scheduling was reactive. Quality control was slow. Growth was constrained by operational chaos.",
    outcome:
      "Fully integrated manufacturing system. Real-time production tracking. Automated quality workflows. Scalable operations ready for market expansion.",
    image_url: "/medical-equipment-manufacturing-production-line-sy.jpg",
    display_order: 2,
  },
  {
    id: "3",
    title: "Artist, Amplified",
    industry: "Entertainment",
    description:
      "A pop/jazz singer needed more than a website — they needed a platform to connect with fans, manage bookings, distribute content, and build a sustainable independent career.",
    outcome:
      "Custom artist platform with integrated booking, fan engagement, content distribution, and revenue streams. Direct audience connection without intermediaries.",
    image_url: "/modern-artist-music-platform-interface-minimalist.jpg",
    display_order: 3,
  },
]

async function getCaseStudies() {
  try {
    const result = await db.query(
      "SELECT * FROM case_studies WHERE is_published = true ORDER BY display_order ASC"
    )
    return result.rows.length > 0 ? result.rows : fallbackCases
  } catch (error) {
    console.error("Failed to fetch case studies:", error)
    return fallbackCases
  }
}

export default async function CaseStudies() {
  const cases = await getCaseStudies()

  return (
    <section id="work" className="relative w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-muted-foreground font-mono">[06]</span>
            <span className="text-sm text-muted-foreground">Select engagements</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-balance">
            Transformations
            <br />
            <span className="text-muted-foreground">we're proud of.</span>
          </h2>
        </div>

        <div className="space-y-8">
          {cases.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              className="group grid md:grid-cols-2 gap-8 p-8 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300"
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden rounded-xl aspect-video ${index % 2 === 1 ? "md:order-2" : ""}`}
              >
                <img
                  src={caseStudy.image_url || "/placeholder.svg"}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className={`flex flex-col justify-center ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <span className="text-sm text-muted-foreground font-mono mb-3">{caseStudy.industry}</span>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">{caseStudy.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{caseStudy.description}</p>
                <div className="p-4 rounded-xl bg-background">
                  <p className="text-sm text-muted-foreground mb-1">The outcome</p>
                  <p className="text-foreground leading-relaxed">{caseStudy.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

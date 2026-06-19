"use client"

export default function DeliveryRhythm() {
  const phases = [
    {
      phase: "Discovery",
      description:
        "We immerse ourselves in your organization. No assumptions, no shortcuts — just deep, honest understanding of where you are and where you need to be.",
    },
    {
      phase: "Strategy",
      description:
        "Together we architect the path forward. Every decision is intentional, every choice defensible. The plan earns your confidence before a line of code is written.",
    },
    {
      phase: "Execution",
      description:
        "Relentless precision in the open. You're never in the dark — we build alongside you, iterate with conviction, and ship what matters.",
    },
    {
      phase: "Evolution",
      description:
        "Transformation doesn't end at launch. We measure what matters, learn continuously, and ensure lasting impact.",
    },
  ]

  return (
    <section id="process" className="relative w-full py-32 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-muted-foreground font-mono">[02]</span>
            <span className="text-sm text-muted-foreground">Our process</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-balance">
            Serious work,
            <br />
            <span className="text-muted-foreground">serious partnership.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((item, index) => (
            <div key={index} className="relative">
              <div className="text-sm text-muted-foreground font-mono mb-4">0{index + 1}</div>
              <h3 className="text-xl font-semibold mb-3 tracking-tight">{item.phase}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

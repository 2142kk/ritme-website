"use client"

export default function Solutions() {
  const approaches = [
    {
      number: "01",
      title: "Deep Understanding",
      description:
        "We don't start with solutions. We start with your world — your customers, your constraints, your ambitions. Only then do we design.",
    },
    {
      number: "02",
      title: "Custom, Not Template",
      description:
        "Every engagement is bespoke. We craft strategies and systems tailored to your specific context, not recycled playbooks.",
    },
    {
      number: "03",
      title: "AI as Accelerant",
      description:
        "We harness AI to move faster and think deeper — but the intelligence that matters most is human. Yours and ours, together.",
    },
    {
      number: "04",
      title: "Outcomes Over Output",
      description:
        "We measure success by your transformation, not our deliverables. The software ships when the strategy is sound.",
    },
  ]

  return (
    <section id="approach" className="relative w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-muted-foreground font-mono">[01]</span>
            <span className="text-sm text-muted-foreground">How we think</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-balance">
            Intelligence
            <br />
            <span className="text-muted-foreground">and intent.</span>
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

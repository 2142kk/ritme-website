"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Loader2, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to submit form")
      }

      await response.json()

      toast({
        title: "Success",
        description: "Thank you for reaching out. We'll be in touch soon.",
      })

      setIsSubmitted(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({ name: "", email: "", company: "", message: "" })
      }, 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative w-full py-32 px-6 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-sm text-muted-foreground font-mono">[07]</span>
            <span className="text-sm text-muted-foreground">For select partners</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-balance mb-6">
            Let's <span className="text-muted-foreground">talk.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We work with a limited number of clients each year. If you're serious about transformation, we'd like to
            hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-all"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-all"
                placeholder="jane@company.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold mb-2">
              Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formState.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-all"
              placeholder="Your Company"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2">
              What's on your mind?
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-all resize-none"
              placeholder="Tell us about the transformation you're considering..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full py-3.5 text-sm font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitted
                  ? "bg-foreground/10 text-foreground"
                  : "bg-foreground text-background hover:bg-foreground/90"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : isSubmitted ? (
                <>
                  <Check className="w-4 h-4" />
                  We'll be in touch
                </>
              ) : (
                <>
                  Begin the conversation
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <p className="text-sm text-muted-foreground text-center pt-2">
            Prefer a direct line?{" "}
            <a href="mailto:hello@ritmeLab.io" className="text-foreground hover:underline">
              hello@ritmeLab.io
            </a>
          </p>
        </form>
      </div>
    </section>
  )
}

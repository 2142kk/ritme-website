import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ThemeProvider from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "ritmeLab — Digital Transformation, Done Right",
  description: "We build futures. For organizations ready to transform with intelligence and intent.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Comic_Neue } from "next/font/google"

// We're using Comic Neue, a more modern version of Comic Sans
const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "AI Chatbot",
  description: "A playful AI-powered chatbot",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={comicNeue.className}>{children}</body>
    </html>
  )
}


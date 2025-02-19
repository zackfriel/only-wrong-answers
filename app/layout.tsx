import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Chatbot",
  description: "A playful AI-powered chatbot with dark mode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={comicNeue.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Samadhi Viduravi | Software Engineer",
  description: "Full Stack Developer & Software Engineering Student at University of Westminster",
  keywords: ["Samadhi Viduravi", "Software Engineer", "Full Stack Developer", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Samadhi Viduravi" }],
  creator: "Samadhi Viduravi",
  publisher: "Samadhi Viduravi",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Samadhi Viduravi | Software Engineer",
    description: "Full Stack Developer & Software Engineering Student",
    url: "https://samadhividuravi.github.io",
    siteName: "Samadhi Viduravi Portfolio",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Samadhi Viduravi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samadhi Viduravi | Software Engineer",
    description: "Full Stack Developer & Software Engineering Student",
    images: ["/images/profile.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/icon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

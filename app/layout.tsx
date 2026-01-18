

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/component/scrollsmooth";
import ScrollProgress from "@/component/singleline";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Ensures text is visible during font load
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Viewport settings are now separate in Next.js 14/15+
export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Zhiyad | Python Full Stack Developer",
    template: "%s | Zhiyad", // Allows sub-pages to have titles like "Projects | Zhiyad"
  },
  description: "Portfolio of a Python Full Stack Developer specializing in Next.js, Python, and GSAP animations.",
  keywords: ["Python Developer", "Full Stack", "Next.js", "GSAP", "Web Design"],
  authors: [{ name: "Zhiyad" }],
  creator: "Zhiyad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zhiyad-portfolio.com", // Replace with your actual domain
    title: "Zhiyad | Python Full Stack Developer",
    description: "Creative Full Stack Developer specializing in high-end web experiences.",
    siteName: "Zhiyad Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Add this to your /public folder for social sharing
        width: 1200,
        height: 630,
        alt: "Zhiyad Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zhiyad | Python Full Stack Developer",
    description: "Full Stack Developer & GSAP Specialist",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="selection:bg-[#b6ed12] selection:text-black">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white min-h-screen overflow-x-hidden`}
      >
        {/* Accessibility: Skip to main content for keyboard users */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:bg-[#b6ed12] focus:text-black focus:px-4 focus:py-2"
        >
          Skip to content
        </a>

        {/* 1. Global Progress Line */}
        <ScrollProgress />

        {/* 2. Smooth Scrolling & Cursor Logic */}
        <SmoothScroll />

        {/* 3. Main Wrapper */}
        <main id="main-content" className="relative flex flex-col min-h-screen">
          {children}
        </main>

        {/* You could add a global Footer here if needed */}
      </body>
    </html>
  );
}
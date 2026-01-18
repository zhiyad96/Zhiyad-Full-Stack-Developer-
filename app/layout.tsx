import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/component/scrollsmooth";
import ScrollProgress from "@/component/singleline"; // Import your new component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zhiyad | Python Full Stack Developer",
  description: "Portfolio of a Python Full Stack Developer specializing in Next.js and GSAP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="selection:bg-[#b6ed12] selection:text-black">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white`}
      >
        {/* 1. The Global Scroll Line - Sits at the absolute top of the viewport */}
        <ScrollProgress />

        {/* 2. Global Smooth Scrolling & Cursor Logic */}
        <SmoothScroll />
        
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
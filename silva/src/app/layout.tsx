import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SILVA — Hoh Valley Resort",
  description: "What if time moved at the speed of trees? A forest resort in the Hoh Rainforest. Scroll to walk through the forest.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${instrument.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0B0F0D] text-[#EDE8DE] overflow-x-hidden">{children}</body>
    </html>
  );
}

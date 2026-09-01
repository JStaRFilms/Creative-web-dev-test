import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Mono, Inter, Caveat } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-hand",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JOHN — Unfinished Document / Living Proof",
  description: "I make things across software, film, AI, design and sound.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${ibmPlexMono.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body className="antialiased min-h-screen bg-[#F1EBDD] text-[#171714] selection:bg-[#D95B3F]/20 selection:text-[#171714] relative">
        {children}
      </body>
    </html>
  );
}

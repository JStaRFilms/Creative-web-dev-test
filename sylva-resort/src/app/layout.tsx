import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SYLVA — A Forest Kept For You | Hoh Rainforest Resort",
  description:
    "12 cabins. 800 acres. No road in. An immersive forest resort in the Hoh Rainforest where architecture disappears. Scroll to journey through canopy, floor, and water.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${jetBrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0D1A14] text-[#E8E6DE] antialiased selection:bg-[#C96A2B]/30">
        {children}
      </body>
    </html>
  );
}

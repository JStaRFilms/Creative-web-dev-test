import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VALD SANCTUARY — Ancient Boreal Forest Retreat",
  description: "A 3D scrollytelling journey through suspended stilt cabins, geothermal mineral springs, and primeval conifer canopies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body
        className="bg-[#080C0A] text-[#E5ECE4] selection:bg-[#D97736] selection:text-[#080C0A]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

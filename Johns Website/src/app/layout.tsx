import type { Metadata } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/inter/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "JOHN — Creative Technologist",
  description: "John Oluleke-Oke makes things across software, film, AI, design and sound.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

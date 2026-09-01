import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Everwild — Deep Forest Resort",
  description: "An immersive 3D journey through an ancient forest. Everwild Resort.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}

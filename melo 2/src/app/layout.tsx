import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MELO — One School. One System.",
  description:
    "A school is one institution. Melo connects academic, financial, administrative, and communication operations into one unified living platform.",
  keywords: [
    "school management platform",
    "education operating system",
    "academic broadsheet compiler",
    "Paystack school fees reconciliation",
    "WAEC NERDC curriculum tracker",
    "school administration software",
  ],
  authors: [{ name: "Melo Technologies Inc." }],
  openGraph: {
    title: "MELO — One School. One System.",
    description:
      "A school is one institution. So why does its information live everywhere? Discover the connected school platform.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F6F3EC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F6F3EC] text-[#111214]">
      <body className="antialiased min-h-screen paper-grain selection:bg-[#FF5A1F] selection:text-white">
        {children}
      </body>
    </html>
  );
}

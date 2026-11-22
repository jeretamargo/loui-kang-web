import type { Metadata } from "next";
import { Syncopate, Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const syncopate = Syncopate({
  subsets: ["latin"],
  variable: "--font-syncopate",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Loui Kang",
  description: "Escucha a Loui Kang, trap genero urbano paraguayo y argentino ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${syncopate.variable} ${inter.variable} h-full bg-ink antialiased scroll-smooth`}
    >
      <body className="font-sans text-cream">{children}</body>
    </html>
  );
}

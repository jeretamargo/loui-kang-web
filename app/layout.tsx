import type { Metadata } from "next";
import { Kanit, Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
});

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Loui Kang",
  description: "Escucha a Loui Kang, trap genero urbano paraguayo Y argentino ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kanit.variable} ${inter.variable}  h-full antialiased bg-[#0F1115] scroll-smooth `}
    >
      <body className="">{children}</body>
    </html>
  );
}

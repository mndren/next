import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test con Next/Prisma/Shadcn",
  description: "Test con Next/Prisma/Shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
          <div className="text-lg font-bold">Test con Next/Prisma/Shadcn</div>
          <div className="space-x-4">
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link href="/utenti" className="hover:text-gray-400">
              Utenti
            </Link>
            <Link href="/posts" className="hover:text-gray-400">
              Posts
            </Link>
          </div>
        </nav>
        <main className="container p-4">{children}</main>
      </body>
    </html>
  );
}

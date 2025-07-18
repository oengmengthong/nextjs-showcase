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
  title: "Next.js Showcase - Complete UI Components & Functions Guide",
  description: "Comprehensive demonstration of all UI components, animations, and features possible with Next.js including forms, buttons, modals, and more.",
  keywords: ["Next.js", "React", "UI Components", "Animations", "Tailwind CSS", "TypeScript"],
  authors: [{ name: "Next.js Showcase" }],
  openGraph: {
    title: "Next.js Showcase - Complete UI Components & Functions Guide",
    description: "Comprehensive demonstration of all UI components, animations, and features possible with Next.js",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}

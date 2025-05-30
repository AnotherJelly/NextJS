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
  title: "Seo lessons",
  description: "Cool seo lessons for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-gray-100 text-gray-800">
        <header className="bg-green-500 text-white py-5 shadow-lg mb-5">
          <h1 className="text-center text-2xl font-bold">Основы SEO</h1>
        </header>
        {children}
      </body>
    </html>
  );
}

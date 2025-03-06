import type { Metadata } from "next";
import { Fira_Code, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import React from "react";

const jetBrainsMono = JetBrains_Mono({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const firaCode = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Retreat of Code",
  description: "This is absolutely not advent of code 😉",
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  category: "Technology",
  creator: "rahulc0dy",
  manifest: "/manifest.json",
  keywords: [
    "Retreat of Code",
    "Advent of Code",
    "puzzle",
    "coding challenge",
    "programming puzzle",
    "daily puzzle",
    "holiday coding challenge",
    "software challenge",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${firaCode.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}

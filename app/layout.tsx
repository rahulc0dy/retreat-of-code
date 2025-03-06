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

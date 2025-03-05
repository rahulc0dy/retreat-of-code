import type { Metadata } from "next";
import { Poppins, Fira_Code } from "next/font/google";
import "@/styles/globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  variable: "--font-poppins",
});

const firaCode = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${poppins.className} ${firaCode.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

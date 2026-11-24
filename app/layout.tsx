import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ConsultationProvider } from "./components/consultation/ConsultationProvider"; // ← ADDED

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IYK Glassworld — Sculpting Light. Engineering Transparency.",
  description:
    "Bespoke architectural glass engineering and luxury glass furniture for residences and commercial landmarks across Abuja and Enugu, Nigeria.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-[#F3EFE6] font-sans text-[#1A1613] antialiased selection:bg-[#2563EB]/25 selection:text-[#1A1613]">
        <ConsultationProvider>{children}</ConsultationProvider> {/* ← ADDED */}
      </body>
    </html>
  );
}

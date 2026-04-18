import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Outfit } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_Devanagari({
  variable: "--font-noto-sans",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PM सूर्य घर योजना - उत्तर प्रदेश | ₹0 में सोलर पैनल लगवाएं",
  description: "PM सूर्य घर मुफ्त बिजली योजना UP - 60% सरकारी सब्सिडी, 25 साल फ्री बिजली, ₹17,500/साल कमाई। अभी आवेदन करें।",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="scroll-smooth">
      <body
        className={`${notoSans.variable} ${outfit.variable} antialiased font-sans flex flex-col min-h-screen relative`}
      >
        <div className="bg-noise mix-blend-overlay"></div>
        {children}
      </body>
    </html>
  );
}

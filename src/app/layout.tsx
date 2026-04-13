import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PM सूर्य घर मुफ्त बिजली योजना — उत्तर प्रदेश | 60% सब्सिडी",
  description:
    "प्रधानमंत्री सूर्य घर मुफ्त बिजली योजना — UP में 60% सरकारी सब्सिडी के साथ सोलर पैनल लगवाएं। ₹0 निवेश, 25 साल फ्री बिजली, ₹17,500/साल कमाई। 3 मिनट में आवेदन करें।",
  keywords:
    "PM Surya Ghar, solar panel UP, free electricity scheme, मुफ्त बिजली, सोलर सब्सिडी, उत्तर प्रदेश",
  openGraph: {
    title: "PM सूर्य घर मुफ्त बिजली योजना — 60% सब्सिडी",
    description: "3 मिनट में आवेदन करें और 25 साल तक फ्री बिजली पाएं।",
    type: "website",
    locale: "hi_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hi"
      className={`${outfit.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

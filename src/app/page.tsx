"use client";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LiveImpactCounter } from "@/components/LiveImpactCounter";
import { VideoProof } from "@/components/VideoProof";
import { ComparisonGrid } from "@/components/ComparisonGrid";
import { BenefitsBento } from "@/components/BenefitsBento";
import { SubsidyTable } from "@/components/SubsidyTable";
import { HowItWorks } from "@/components/HowItWorks";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { EligibilityQuiz } from "@/components/EligibilityQuiz";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppCommunity } from "@/components/WhatsAppCommunity";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ToastNotification } from "@/components/ToastNotification";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />
        <LiveImpactCounter />
        <VideoProof />
        <ComparisonGrid />
        <BenefitsBento />
        <SubsidyTable />
        <HowItWorks />
        <SavingsCalculator />
        <EligibilityQuiz />
        <Testimonials />
        <WhatsAppCommunity />
        <ApplicationForm />
        <FAQ />
      </main>

      <Footer />

      {/* Live Toast Notifications */}
      <ToastNotification />

      {/* WhatsApp Floating Action Button */}
      <a
        href="https://wa.me/919999999999?text=मुझे PM सूर्य घर योजना के बारे में जानकारी चाहिए"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="WhatsApp पर संपर्क करें"
        id="whatsapp-fab"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </a>
    </>
  );
}

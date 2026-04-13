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
import { FAQ, Footer } from "@/components/FAQ";
import { ToastNotification } from "@/components/ToastNotification";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
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
      <Footer />
      <ToastNotification />
    </main>
  );
}

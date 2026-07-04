import Navbar from "@/components/Navbar";
import BackgroundFX from "@/components/BackgroundFX";
import Hero from "@/components/Hero";
import DashboardPreview from "@/components/landing/DashboardPreview";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import CapabilitiesBento from "@/components/CapabilitiesBento";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import IntegrationsDock from "@/components/IntegrationsDock";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <BackgroundFX />
      <Navbar />
      <main id="top" className="relative z-10">
        <Hero />
        <DashboardPreview />
        <ProblemSection />
        <HowItWorks />
        <CapabilitiesBento />
        <ArchitectureDiagram />
        <IntegrationsDock />
        <UseCases />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

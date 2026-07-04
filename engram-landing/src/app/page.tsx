import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import CapabilitiesGrid from "@/components/CapabilitiesGrid";
import HowItWorks from "@/components/HowItWorks";
import IntegrationsMarquee from "@/components/IntegrationsMarquee";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <ArchitectureDiagram />
        <CapabilitiesGrid />
        <HowItWorks />
        <IntegrationsMarquee />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

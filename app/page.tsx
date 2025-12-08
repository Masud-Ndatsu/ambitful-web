import { FeaturedOpportunities } from "@/components/FeaturedOpportunities";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <header className="max-w-[158.6rem] mx-auto">
        <Navbar />
      </header>

      <HeroSection />

      <section className="max-w-[158.6rem] w-full m-auto p-10">
        <FeaturedOpportunities />
      </section>

      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}

import { FeaturedOpportunities } from "@/components/FeaturedOpportunities";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // Check if user is authenticated and redirect to dashboard
  const userResponse = await getCurrentUser();
  if (userResponse?.success) {
    redirect("/x/opportunities");
  }

  return (
    <main>
      <header className="max-w-[159.7rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navbar />
      </header>

      <HeroSection />

      <section className="max-w-[159.7rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FeaturedOpportunities />
      </section>

      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}

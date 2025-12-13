import { Header } from "./components/Header";
import Footer from "@/components/Footer";
import AboutSection from "./components/AboutSection";
import MissionVisionSection from "./components/MissionVisionSection";
import FixingJobSpaceSection from "./components/FeaturedJobSection";
import CoreValues from "./components/CoreValue";

export default function AboutPage() {
  return (
    <main className="p-8 text-[2.358rem]">
      <Header />
      <AboutSection />
      <MissionVisionSection />
      <FixingJobSpaceSection />
      <CoreValues />
      <Footer />
    </main>
  );
}

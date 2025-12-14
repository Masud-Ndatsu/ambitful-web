import { Header } from "../../components/Header";
import Footer from "@/components/Footer";
import AboutSection from "./components/AboutSection";
import MissionVisionSection from "./components/MissionVisionSection";
import FixingJobSpaceSection from "./components/FeaturedJobSection";
import CoreValues from "./components/CoreValue";
import ReadyToConnect from "./components/ReadyToConnect";
import TryAmbitfulAI from "./components/TryAmbitfulAI";

export default function AboutPage() {
  return (
    <main className="p-8 text-[2rem] leading-[3.536rem]">
      <Header
        title="Revolutionizing the Future of Job Discovery"
        description=" Discover how Ambitful AI is revolutionizing the way people connect
          with life-changing opportunities through cutting-edge artificial
          intelligence and a commitment to excellence."
      />
      <AboutSection />
      <MissionVisionSection />
      <FixingJobSpaceSection />
      <CoreValues />
      <TryAmbitfulAI />
      <ReadyToConnect />
      <Footer />
    </main>
  );
}

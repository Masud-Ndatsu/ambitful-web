import { Target, Eye } from "lucide-react";

export default function MissionVisionSection() {
  return (
    <section className="w-full py-16 md:py-20 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-[159.7rem] mx-auto grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Mission */}
        <div className="p-8 md:p-12 rounded-2xl bg-card shadow-[0_0_20px_rgba(0,223,130,0.15)] border border-primary/30">
          <div className="text-primary mb-6">
            <Target size={48} />
          </div>
          <h3 className="font-bold font-degular mb-6 md:mb-8 text-[2.5rem] md:text-[3rem] text-foreground">
            Our Mission
          </h3>
          <p className="text-muted-foreground text-[1.8rem] md:text-[2rem] leading-relaxed">
            To democratize access to career opportunities by using artificial
            intelligence to eliminate bias, reduce friction, and create
            meaningful connections between talented individuals and
            organizations seeking their potential. We strive to make the job
            search process more efficient, transparent, and successful for
            everyone involved.
          </p>
        </div>

        {/* Vision */}
        <div className="p-8 md:p-12 rounded-2xl bg-card shadow-[0_0_20px_rgba(0,223,130,0.15)] border border-primary/30">
          <div className="text-primary mb-6">
            <Eye size={48} />
          </div>
          <h3 className="font-bold font-degular text-[2.5rem] md:text-[3rem] mb-6 md:mb-8 text-foreground">
            Our Vision
          </h3>
          <p className="text-muted-foreground text-[1.8rem] md:text-[2rem] leading-relaxed">
            To become the world&apos;s most trusted AI-powered career platform,
            where every person can discover opportunities that unlock their full
            potential, and every organization can find the talent that propels
            it forward. We envision a future where career growth is accessible,
            equitable, and driven by intelligence that serves humanity.
          </p>
        </div>
      </div>
    </section>
  );
}

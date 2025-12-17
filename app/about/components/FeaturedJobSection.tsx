import { Target, Users, Zap, Shield } from "lucide-react";

export default function FixingJobSpaceSection() {
  const features = [
    {
      title: "AI-Powered Matching",
      description: "Our algorithm analyzes your expertise, skills, personality, and cultural fit to recommend opportunities with unmatched accuracy.",
      icon: Target
    },
    {
      title: "Personalized Experience", 
      description: "Every user receives a customized experience with insights, tailored job recommendations, career guidance, and contextual matches.",
      icon: Users
    },
    {
      title: "Instant Connections",
      description: "We eliminate the waiting game. Our system connects talent and employers in real-time, reducing hiring friction.",
      icon: Zap
    },
    {
      title: "Bias-Free Recruitment",
      description: "Our AI is trained to focus on what truly matters—skills, experience, and potential—helping create fairer outcomes for everyone.",
      icon: Shield
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[159.7rem] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-medium font-degular text-[4rem] md:text-[5.9rem] leading-tight mb-6 text-foreground">
            Fixing The Job Space
          </h2>
          <p className="text-muted-foreground text-[1.8rem] md:text-[2rem] max-w-3xl mx-auto">
            We're addressing the biggest challenges in recruitment with innovative,
            AI-driven solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}) {
  return (
    <div className="p-6 md:p-8 rounded-xl border border-primary/30 bg-card shadow-[0_0_20px_rgba(0,223,130,0.15)] h-full flex flex-col">
      <div className="mb-6 text-primary">
        <Icon size={48} />
      </div>
      <h4 className="font-bold font-degular text-[1.8rem] md:text-[2rem] mb-4 text-foreground">
        {title}
      </h4>
      <p className="text-muted-foreground text-[1.6rem] leading-relaxed flex-1">
        {description}
      </p>
    </div>
  );
}

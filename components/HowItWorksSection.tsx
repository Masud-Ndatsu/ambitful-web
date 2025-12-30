import Image from "next/image";

const steps = [
  {
    icon: "/search.svg",
    title: "Browse",
    description:
      "Discover curated opportunities tailored to your interests and goals.",
  },
  {
    icon: "/star.svg",
    title: "Match",
    description:
      "Let AI recommend what fits your profile and aspirations best.",
  },
  {
    icon: "/send.svg",
    title: "Apply",
    description:
      "Access application details, deadlines, and requirements easily.",
  },
  {
    icon: "/trend.svg",
    title: "Grow",
    description: "Track your progress and celebrate your success stories.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="p-10 lg:p-20 w-full text-center">
      <div className="max-w-[159.7rem] mx-auto px-4">
        <header className="mb-26">
          <h1 className="font-bold font-degular text-[6rem] mb-4">
            How It Works
          </h1>
          <p className="text-[2.2rem] text-muted-foreground">
            Four simple steps to discovering your next opportunity
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 justify-items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="max-w-132 flex flex-col items-center px-4"
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-[11.4rem] md:h-[11.4rem] mb-6 md:mb-8 grid place-items-center shadow-glow-tile rounded-2xl border border-primary">
                <Image
                  src={step.icon}
                  alt={`${step.title} Icon`}
                  width={50}
                  height={50}
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
              </div>
              <h4 className="text-[2.4rem] md:text-[3rem] font-bold font-degular mb-3 md:mb-4">
                {step.title}
              </h4>
              <p className="text-[1.6rem] md:text-[1.9rem] leading-[2.4rem] md:leading-[2.8rem] text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

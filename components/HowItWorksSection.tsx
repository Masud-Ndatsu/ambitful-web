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
    <section className="py-72 w-full text-center">
      <div className="max-w-[158.6rem] m-auto">
        <div className="text-center">
          <h1 className="font-bold font-degular text-[4rem] lg:text-[6rem]">
            How It Works
          </h1>
          <p className="text-[2.243rem]">
            Four simple steps to discovering your next opportunity
          </p>
        </div>

        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-[2.3rem] pt-20">
          {steps.map((step, index) => (
            <div key={index} className="w-[33.255rem]">
              <div className="w-[11.363rem] h-[11.363rem] m-auto grid place-items-center shadow-glow-tile rounded-[1.08rem]">
                <Image
                  src={step.icon}
                  alt={`${step.title} Icon`}
                  width={49.84375}
                  height={49.84375}
                />
              </div>
              <h4 className="text-[2.3rem] py-[2.2rem] font-bold font-degular">
                {step.title}
              </h4>
              <p className="text-[2rem]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import Image from "next/image";

const steps = [
  {
    icon: "/search.svg",
    title: "Browse",
    description: "Discover curated opportunities tailored to your interests and goals."
  },
  {
    icon: "/star.svg",
    title: "Match",
    description: "Let AI recommend what fits your profile and aspirations best."
  },
  {
    icon: "/send.svg",
    title: "Apply",
    description: "Access application details, deadlines, and requirements easily."
  },
  {
    icon: "/trend.svg",
    title: "Grow",
    description: "Track your progress and celebrate your success stories."
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 max-w-[1597px] w-full m-auto text-center">
      <div className="text-center">
        <h1 className="font-bold font-degular text-[60px]">How It Works</h1>
        <p className="text-[22.43px]">
          Four simple steps to discovering your next opportunity
        </p>
      </div>

      <div className="grid grid-cols-4 gap-[23px] pt-20">
        {steps.map((step, index) => (
          <div key={index} className="w-[332.55px]">
            <div className="w-[113.63px] h-[113.63px] m-auto grid place-items-center border border-primary rounded-[10.8px]">
              <Image
                src={step.icon}
                alt={`${step.title} Icon`}
                width={49.84375}
                height={49.84375}
              />
            </div>
            <h4 className="text-[29.91px] font-bold font-degular">{step.title}</h4>
            <p className="text-[19.94px]">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
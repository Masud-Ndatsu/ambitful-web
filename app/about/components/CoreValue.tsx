import { Card, CardContent } from "@/components/ui/card";

const CoreValues = () => {
  const values = [
    {
      title: "People First",
      description:
        "We put the needs and success of our users at the center of everything we do. Every feature, every algorithm, and every decision is made with the goal of creating better outcomes for people.",
    },
    {
      title: "Innovation",
      description:
        "We constantly push the boundaries of what's possible with AI and technology, always seeking better ways to connect talent with opportunity and improve the career journey.",
    },
    {
      title: "Growth & Development",
      description:
        "We believe in continuous improvement—for our platform, our team, and our users. We're committed to helping everyone reach their full potential and achieve their career goals.",
    },
    {
      title: "Integrity & Trust",
      description:
        "We operate with transparency, honesty, and fairness. We protect user data, respect privacy, and ensure our AI systems work ethically and without bias.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[159.7rem] mx-auto w-full">
        {/* Main Title */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="font-medium font-degular text-[4rem] md:text-[5.9rem] leading-tight mb-6 text-foreground">
            Our Core Values
          </h1>
          <p className="text-muted-foreground font-medium text-[1.8rem] md:text-[2rem]">
            The principles that guide everything we do
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {values.map((value, index) => (
            <Card key={index} className="border-primary/30 bg-card">
              <CardContent className="p-6 md:p-8 flex items-start gap-6">
                <div className="grid place-items-center min-w-[6rem] h-[6rem] md:min-w-[8rem] md:h-[8rem] bg-primary/10 rounded-xl text-primary text-[2rem] md:text-[2.5rem] font-bold">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold font-degular text-[2rem] md:text-[2.5rem] mb-4 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-[1.6rem] md:text-[1.8rem] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;

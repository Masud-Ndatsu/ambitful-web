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
    <section className="w-full flex flex-col items-center justify-center py-[11.788rem] mx-auto lg:px-[14.146rem]">
      <div className="max-w-[163.7rem] mx-auto w-full">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="font-medium text-[5.9rem] leading-[4.421rem] mb-4 tracking-[-0.066rem]">
            Our Core Values
          </h1>
          <p className="text-[#FFFFFFB2] font-medium mt-8 mb-[11.7rem]">
            The principles that guide everything we do
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[4.715rem]">
          {values.map((value, index) => (
            <Card key={index} className="border-primary">
              <CardContent className="p-8 flex items-start gap-[3.536rem]">
                <div className="grid place-items-center min-w-[8.251rem] h-[8.251rem] bg-[#03624C4D]/30 text-primary mb-6">
                  <span className=" font-semibold tracking-wider">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-[2.652rem] mb-4 tracking-tight">
                    {value.title}
                  </h3>

                  <p className="text-[#FFFFFFB2]">{value.description}</p>
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

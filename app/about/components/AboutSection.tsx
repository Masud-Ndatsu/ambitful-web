import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full py-16 md:py-20 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-[159.7rem] mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-primary font-medium text-[2.5rem] md:text-[3rem] leading-tight mb-6 md:mb-8">
            About Ambitful AI
          </h2>

          <h3 className="text-[2rem] md:text-[2.5rem] leading-tight font-medium font-degular mb-6 md:mb-8 text-foreground">
            Revolutionizing Career Connections Through AI
          </h3>

          <p className="text-muted-foreground mb-8 leading-relaxed text-[1.8rem] md:text-[2rem]">
            At Ambitful AI, we are on a mission to transform how people
            discover and secure meaningful career opportunities. By leveraging
            cutting-edge artificial intelligence, we connect talent and industry
            with precision—building relationships that align perfectly with
            their skills, aspirations, and potential.
          </p>

          <p className="text-muted-foreground leading-relaxed text-[1.8rem] md:text-[2rem]">
            Founded on the belief that everyone deserves access to opportunities
            that can change their lives, we built an intelligent platform that
            understands human needs, not just resumes and generic keywords.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-[50rem] h-[40rem] md:h-[50rem]">
            <Image
              src="/ai_chip.jpg"
              alt="AI Chip representing cutting-edge technology"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-xl shadow-[0_0_40px_rgba(0,223,130,0.25)] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

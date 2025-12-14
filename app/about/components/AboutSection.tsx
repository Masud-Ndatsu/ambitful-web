// components/AboutSection.tsx
export default function AboutSection() {
  return (
    <section className="w-full py-20 text-white mx-auto px-6">
      <div className="max-w-[160.3rem] m-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-green-400 font-meduim text-[3rem] leading-[5.305rem] mb-8">
            About Ambitiful AI
          </h2>

          <h3 className="text-[2rem] leading-[4.421rem] tracking-[-0.066rem] font-medium mb-8">
            Revolutionizing Career Connections Through AI
          </h3>

          <p className="text-[#FFFFFFB2] mb-[3.536rem] leading-[3.536rem]">
            At Ambitiful AI, we are on a mission to transform how people
            discover and secure meaningful career opportunities. By leveraging
            cutting-edge artificial intelligence, we connect talent and industry
            with precision—building relationships that align perfectly with
            their skills, aspirations, and potential.
          </p>

          <p className="text-[#FFFFFFB2] leading-[3.536rem]">
            Founded on the belief that everyone deserves access to opportunities
            that can change their lives, we built an intelligent platform that
            understands human needs, not just resumes and generic keywords.
          </p>
        </div>

        <div className="flex justify-center h-228">
          <img
            src="/ai_chip.jpg"
            alt="AI Chip"
            className="rounded-xl shadow-[0_0_40px_rgba(0,255,150,0.25)] w"
          />
        </div>
      </div>
    </section>
  );
}

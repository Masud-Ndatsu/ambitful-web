// components/AboutSection.tsx
export default function AboutSection() {
  return (
    <section className="w-full py-20 text-white mx-auto px-6">
      <div className="max-w-[160.3rem] m-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-green-400 font-meduim text-[3.536rem] mb-[3.536rem]">
            About Ambitiful AI
          </h2>

          <h3 className="text-3xl font-bold mb-[3.536rem] leading-snug">
            Revolutionizing Career Connections Through AI
          </h3>

          <p className="text-gray-300 mb-[3.536rem] leading-relaxed">
            At Ambitiful AI, we are on a mission to transform how people
            discover and secure meaningful career opportunities. By leveraging
            cutting-edge artificial intelligence, we connect talent and industry
            with precision—building relationships that align perfectly with
            their skills, aspirations, and potential.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Founded on the belief that everyone deserves access to opportunities
            that can change their lives, we built an intelligent platform that
            understands human needs, not just resumes and generic keywords.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src="/ai_chip.jpg"
            alt="AI Chip"
            className="rounded-xl shadow-[0_0_40px_rgba(0,255,150,0.25)]"
          />
        </div>
      </div>
    </section>
  );
}

// components/FixingJobSpaceSection.tsx
export default function FixingJobSpaceSection() {
  return (
    <section className="w-full py-[11.788rem] mx-auto px-[14.146rem]">
      <h2 className="text-center text-[5.9rem] leading-[4.421rem] tracking-[-0.066rem] font-medium mb-4">
        Fixing The Job Space
      </h2>

      <p className="text-center text-gray-300 max-w-396 tracking-[-0.046rem] mx-auto mt-16 mb-[9.431rem]">
        We’re addressing the biggest challenges in recruitment with innovative,
        AI-driven solutions.
      </p>

      <div className="max-w-[163.7rem] m-auto grid md:grid-cols-4 gap-[4.715rem]">
        <Feature
          title="AI-Powered Matching"
          description="Our algorithm analyzes your expertise, skills, personality, and cultural fit to recommend opportunities with unmatched accuracy."
        />

        <Feature
          title="Personalized Experience"
          description="Every user receives a customized experience with insights, tailored job recommendations, career guidance, and contextual matches."
        />

        <Feature
          title="Instant Connections"
          description="We eliminate the waiting game. Our system connects talent and employers in real-time, reducing hiring friction."
        />

        <Feature
          title="Bias-Free Recruitment"
          description="Our AI is trained to focus on what truly matters—skills, experience, and potential—helping create fairer outcomes for everyone."
        />
      </div>
    </section>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 tracking-[-0.046rem] rounded-xl border border-green-500/30 shadow-[0_0_20px_rgba(0,255,150,0.15)]">
      <div className="mb-4 text-green-400">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="20" stroke="#00DF82" strokeWidth="4" />
          <circle cx="24" cy="24" r="12" stroke="#00DF82" strokeWidth="4" />
          <circle cx="24" cy="24" r="4" stroke="#00DF82" strokeWidth="4" />
        </svg>
      </div>
      <h4 className="font-semibold mb-3">{title}</h4>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}

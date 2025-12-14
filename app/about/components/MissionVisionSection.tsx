// components/MissionVisionSection.tsx
export default function MissionVisionSection() {
  return (
    <section className="w-full py-[11.788rem] mx-auto px-[14.146rem]">
      <div className="max-w-[163.7rem] m-auto grid md:grid-cols-2 gap-[7.073rem]">
        {/* Mission */}
        <div
          className="p-12 rounded-[2.358rem]
            shadow-[0_0_20px_rgba(0,255,150,0.15)] border border-green-500/30"
        >
          <div className="text-green-400 mb-4">
            {" "}
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
          <h3 className="font-bold my-8 text-[2rem]">Our Mission</h3>

          <p className="text-gray-300 text-[2rem]">
            To democratize access to career opportunities by using artificial
            intelligence to eliminate bias, reduce friction, and create
            meaningful connections between talented individuals and
            organizations seeking their potential. We strive to make the job
            search process more efficient, transparent, and successful for
            everyone involved.
          </p>
        </div>

        {/* Vision */}
        <div
          className="p-12 rounded-[2.358rem]
            shadow-[0_0_20px_rgba(0,255,150,0.15)] border border-green-500/30"
        >
          <div className="text-green-400 mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.05152 24.2601C3.88778 23.819 3.88778 23.3338 4.05152 22.8927C5.64626 19.0259 8.35325 15.7196 11.8293 13.3932C15.3053 11.0667 19.3939 9.82471 23.5767 9.82471C27.7594 9.82471 31.848 11.0667 35.324 13.3932C38.8001 15.7196 41.5071 19.0259 43.1018 22.8927C43.2656 23.3338 43.2656 23.819 43.1018 24.2601C41.5071 28.1269 38.8001 31.4331 35.324 33.7596C31.848 36.0861 27.7594 37.328 23.5767 37.328C19.3939 37.328 15.3053 36.0861 11.8293 33.7596C8.35325 31.4331 5.64626 28.1269 4.05152 24.2601Z"
                stroke="#00DF82"
                strokeWidth="3.92939"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="24" r="6" stroke="#00DF82" strokeWidth="4" />
            </svg>
          </div>
          <h3 className="font-bold text-[2rem] my-8">Our Vision</h3>

          <p className="text-gray-300 text-[2rem]">
            To become the world’s most trusted AI-powered career platform, where
            every person can discover opportunities that unlock their full
            potential, and every organization can find the talent that propels
            it forward. We envision a future where career growth is accessible,
            equitable, and driven by intelligence that serves humanity.
          </p>
        </div>
      </div>
    </section>
  );
}

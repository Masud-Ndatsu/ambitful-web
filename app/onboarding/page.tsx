"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  return (
    <main className="mt-[8.1rem] w-[65.7rem] bg-[#FFFFFF] p-16">
      <header className="flex items-center justify-center gap-4 py-12">
        <div className="h-[1.14rem] w-[1.14rem] bg-[#03624C] rounded-full"></div>
        <div className="h-[0.228125rem] w-[3.65rem] bg-[#03624C]"></div>
        <div className="h-[1.14rem] w-[1.14rem] border-[0.228rem] border-[#E2E4E9] rounded-full"></div>
        <p className="uppercase">Step 1 of 2</p>
      </header>
      <section className="">
        <>
          <h1 className="font-degular font-semibold text-[4.106rem] leading-[4.563rem]">
            Let's personalize your experience
          </h1>
          <p className="text-[1.825rem] leading-[2.738rem] mt-8 mb-12">
            Tell us what you're looking for
          </p>
          <div className="text-[1.597rem] mb-8">
            <label
              className="block text-[#344054] uppercase mb-4"
              htmlFor="name"
            >
              Job Function
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="py-[1.333rem] px-[1.867rem] border-[0.133rem] mt-[0.8] rounded-[0.684rem] w-full"
              placeholder="Select your job function for best result"
            />
            <p className="text-[#676F7E] text-[1.369rem] leading-[1.825rem] my-8">
              Choose the field that best matches your expertise
            </p>
          </div>
          <div className="text-[1.597rem] mb-8">
            <label
              className="block text-[#344054] uppercase mb-4"
              htmlFor="name"
            >
              Job Type
            </label>
            <div className="flex justify-between">
              {["Full-time", "Contract", "Part-time", "Internship"].map(
                (type) => (
                  <div key={type} className="flex items-center space-x-3">
                    <Checkbox id={`job-type-${type}`} className="h-6 w-6" />
                    <label
                      htmlFor={`job-type-${type}`}
                      className="text-[1.597rem] text-[#1F242E] cursor-pointer"
                    >
                      {type}
                    </label>
                  </div>
                )
              )}
            </div>
            <div className="flex items-center space-x-3 mt-6">
              <Checkbox id="job-type-other" className="h-6 w-6" />
              <label
                htmlFor="job-type-other"
                className="text-[1.597rem] text-[#1F242E] cursor-pointer"
              >
                Other
              </label>
            </div>

            <p className="text-[#676F7E] text-[1.369rem] leading-[1.825rem] my-8">
              Select all that apply{" "}
            </p>
          </div>
          <div className="text-[1.597rem] mb-8">
            <label
              className="block text-[#344054] uppercase mb-4"
              htmlFor="name"
            >
              Location
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="py-[1.333rem] px-[1.867rem] border-[0.133rem] mt-[0.8]  rounded-[0.684rem] w-full"
              placeholder="e.g San Francisco, CA"
            />
            <div className="flex items-center space-x-3 mt-6">
              <Checkbox id="remote-work" className="h-6 w-6" />
              <label
                htmlFor="remote-work"
                className="text-[1.597rem] text-[#1F242E] cursor-pointer"
              >
                Open to remote work
              </label>
            </div>
          </div>
          <div className="text-[1.597rem] mb-8">
            <label
              className="block text-[#344054] uppercase mb-4"
              htmlFor="name"
            >
              Work Authorization
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="py-[1.333rem] px-[1.867rem] border-[0.133rem] mt-[0.8]  rounded-[0.684rem] w-full"
              placeholder="Select your work authorization status"
            />
            <p className="text-[#676F7E] text-[1.369rem] leading-[1.825rem] my-8">
              This helps us show you eligible opportunities{" "}
            </p>
          </div>
        </>

        <Button className="block bg-[#03624C] max-w-[22.9rem] w-full my-12 mx-auto">
          Next
        </Button>
      </section>
    </main>
  );
}

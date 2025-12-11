"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const faqs = [
    {
      question: "How does Ambitful.AI work?",
      answer:
        "We recommend a diversified portfolio tailored to your individual needs. This may include stocks, bonds, mutual funds, ETFs, real estate.",
    },
    {
      question: "Is the platform free to use?",
      answer:
        "Yes, the basic features are completely free. Premium features may require a subscription.",
    },
    {
      question: "How long does it typically take to find a job?",
      answer:
        "Most users see results within 2–6 weeks depending on their level and industry.",
    },
    {
      question: "What type of career advice does the AI provide?",
      answer:
        "The AI gives personalized suggestions on resume improvement, job matching, skill gaps, and interview preparation.",
    },
  ];

  return (
    <section className=" max-w-[158.6rem] mx-auto w-full py-48">
      <div className="flex flex-col items-center gap-4 mb-10">
        <span className="w-[11.7rem] h-[3.6rem] grid place-items-center rounded-2xl border border-primary text-foreground text-sm font-medium">
          FAQ
        </span>

        <h2 className="text-[5.9rem] mb-12 font-semibold text-center text-white">
          Have a Question? Look Here
        </h2>
      </div>

      <div className="max-w-606 w-full mx-auto space-y-4 px-4">
        <Accordion type="single" collapsible className="space-y-8 mb-10">
          {faqs.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="border border-[#0CFF8F]/30 rounded-xl bg-black p-8!"
            >
              <AccordionTrigger className="text-left text-[2.8rem] font-medium text-white hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="max-w-[111.11rem] text-white/60 text-[2rem] pb-4 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

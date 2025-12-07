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
    <section className="w-full py-[120px]">
      <div className="flex flex-col items-center gap-4 mb-10">
        <span className="px-6 py-1 rounded-full bg-[#0CFF8F]/10 text-foreground text-sm font-medium">
          FAQ
        </span>

        <h2 className="text-3xl md:text-[65.16px] font-semibold text-center text-white">
          Have a Question? Look Here
        </h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 px-4">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="border border-[#0CFF8F]/30 rounded-xl bg-black p-5!"
            >
              <AccordionTrigger className="text-left text-[28px] font-medium text-white hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="text-gray-300 text-[20px] pb-4 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

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
    <section className="max-w-[159.7rem] mx-auto w-full py-16 md:py-20 px-4 md:px-8">
      <div className="flex flex-col items-center gap-6 mb-12 md:mb-16">
        <span className="w-[11.7rem] h-[3.6rem] grid place-items-center rounded-2xl border border-primary text-foreground text-[1.4rem] font-medium">
          FAQ
        </span>

        <h2 className="text-[4rem] md:text-[5.9rem] mb-4 font-semibold text-center text-foreground font-degular">
          Have a Question? Look Here
        </h2>
      </div>

      <div className="max-w-7xl w-full mx-auto">
        <Accordion type="single" collapsible className="space-y-6">
          {faqs.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="border border-primary/30 rounded-xl bg-card p-6 md:p-8"
            >
              <AccordionTrigger className="text-left text-[2rem] md:text-[2.8rem] font-medium text-foreground hover:no-underline py-4">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground text-[1.6rem] md:text-[2rem] pb-4 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

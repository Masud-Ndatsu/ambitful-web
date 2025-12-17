import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";

export default function ReadyToConnect() {
  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[159.7rem] mx-auto text-center">
        <h3 className="font-medium font-degular text-[4rem] md:text-[5rem] leading-tight mb-8 text-foreground">
          Are You Ready to Connect?
        </h3>
        <p className="text-[1.8rem] md:text-[2rem] leading-relaxed mb-12 text-muted-foreground max-w-3xl mx-auto">
          Have questions or want to learn more about how Ambitful AI can help
          you? Get in touch with our team today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Button size="xl" className="flex items-center justify-center gap-3">
            <Mail size={20} />
            Email Us
          </Button>
          <Button size="xl" variant="secondary" className="bg-secondary flex items-center justify-center gap-3">
            <MessageCircle size={20} />
            WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";

export default function ReadyToConnect() {
  return (
    <section className="py-[11.788rem] px-[29.986rem]">
      <div className="text-center">
        <h3 className="leading-[4.421rem] tracking-[-0.066rem] text-[5.9rem]">
          Are You Ready to Connect?
        </h3>
        <p className="text-[2.358rem] leading-[3.536rem] tracking-[-0.046rem] mt-8 mb-[4.715rem]">
          Have questions or want to learn more about how Ambitful AI can help
          you? Get in touch with our team today.
        </p>
        <div className="flex justify-center gap-[2.358rem]">
          <Button className="bg-[#00DF82] text-background rounded-[1.179rem] text-[2.063rem] leading-[2.947rem] tracking-[-0.022rem]">
            <Mail className="h-[1.99rem]! w-[1.99rem]!" />
            Email Us
          </Button>
          <Button className="bg-[#03624C] rounded-[1.179rem] text-[2.063rem] leading-[2.947rem] tracking-[-0.022rem]">
            <MessageCircle className="h-[1.99rem]! w-[1.99rem]!" /> WhatsApp
          </Button>
        </div>{" "}
      </div>
    </section>
  );
}

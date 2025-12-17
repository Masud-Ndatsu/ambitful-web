import { Navbar } from "@/components/Navbar";

interface HeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <header className="bg-[#00df82]/30 rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-8 mb-16">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <Navbar />
      </div>

      <div className="text-center max-w-480 mx-auto py-16 md:py-20 px-4">
        <h1 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-degular mb-6 md:mb-8 font-bold leading-tight text-foreground">
          {title}
        </h1>
        <p className="text-[1.8rem] md:text-[2rem] leading-relaxed text-foreground max-w-5xl mx-auto">
          {description}
        </p>
      </div>
    </header>
  );
};

import { Navbar } from "@/components/Navbar";

interface HeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <header className="bg-linear-to-r from-[#03624C66] to-[#03624C66] border rounded-4xl border-black/20 py-12">
      <Navbar />

      <div className="text-center max-w-[123.7rem] m-auto my-40">
        <h1 className="text-[8rem] font-degular mb-12 font-bold leading-40 tracking-[-0.046rem]">
          {title}
        </h1>
        <p className="text-[2.1rem] leading-[3.536rem]">{description}</p>
      </div>
    </header>
  );
};

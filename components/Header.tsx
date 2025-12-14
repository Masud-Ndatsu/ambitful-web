import { Navbar } from "@/components/Navbar";

interface HeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <header className="bg-linear-to-r from-[#03624C66] to-[#03624C66] border rounded-4xl border-black/20 py-12">
      <Navbar />

      <div className="text-center max-w-[123.7rem] m-auto my-20 p-4 lg:my-40">
        <h1 className=" text-[6rem] lg:text-[8rem] font-degular mb-12 font-bold leading-24 lg:leading-36 tracking-[-0.046rem]">
          {title}
        </h1>
        <p className="text-[2rem] leading-[3.536rem]">{description}</p>
      </div>
    </header>
  );
};

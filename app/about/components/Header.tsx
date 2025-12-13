import { Navbar } from "@/components/Navbar";

export const Header = () => {
  return (
    <header className="bg-linear-to-r from-[#03624C66] to-[#030F0F] border rounded-4xl border-black/20 py-12">
      <Navbar />

      <div className="text-center max-w-[123.7rem] m-auto my-40">
        <h1 className="text-[10rem] font-degular mb-12 font-bold leading-40 tracking-[-0.046rem]">
          Revolutionizing the Future of Job Discovery
        </h1>
        <p className="text-[2.358rem] leading-[3.536rem]">
          Discover how Ambitful AI is revolutionizing the way people connect
          with life-changing opportunities through cutting-edge artificial
          intelligence and a commitment to excellence.
        </p>
      </div>
    </header>
  );
};

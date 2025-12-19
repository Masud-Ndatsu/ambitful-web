import Link from "next/link";

interface LogoProps {
  isMobile?: boolean;
  size?: "default" | "sidebar" | "compact";
  className?: string;
}

export const Logo = ({
  isMobile = false,
  size = "default",
  className,
}: LogoProps) => {
  const baseClasses = "font-bold text-[#03624C] font-degular";

  const getSizeClasses = () => {
    if (size === "sidebar") {
      return "text-[2.4rem] leading-tight";
    }
    if (size === "compact") {
      return "text-[1.2rem] leading-tight";
    }
    return isMobile ? "text-[3.4rem] sm:text-[3.8rem]" : "text-[3.8rem]";
  };

  const sizeClasses = getSizeClasses();

  return (
    <Link
      href={"/"}
      className={`${baseClasses} ${sizeClasses} ${className || ""}`}
    >
      Ambitful.ai
    </Link>
  );
};

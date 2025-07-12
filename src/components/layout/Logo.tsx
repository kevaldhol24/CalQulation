import Image from "next/image";

interface LogoProps {
  flag?: boolean;
}

export const Logo = ({ flag }: LogoProps) => (
  <div className="flex items-center gap-2">
    <Image src={flag ? "/Images/logo/Calqulation-light.svg" : "/Images/logo/Calqulation.svg"} height={40} width={40} alt="logo"/>
    <span
      className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent${
        flag
          ? " from-white via-purple-300/90 to-white"
          : " from-blue-600 via-purple-500 to-blue-600"
      }`}
    >
      CalQulation
    </span>
  </div>
);

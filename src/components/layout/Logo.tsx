import { MdCalculate } from "react-icons/md";

interface LogoProps {
  flag?: boolean;
}

export const Logo = ({ flag }: LogoProps) => (
  <div className="flex items-center gap-2">
    <div className="bg-[#a419ff] p-2 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
      <MdCalculate className="text-white text-xl" />
    </div>
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

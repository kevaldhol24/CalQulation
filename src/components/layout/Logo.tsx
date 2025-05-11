import { MdCalculate } from "react-icons/md";

export const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
      <MdCalculate className="text-white text-xl" />
    </div>
    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
      CalQulation
    </span>
  </div>
);

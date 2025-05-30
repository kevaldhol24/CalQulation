import { Button } from "@/components/ui/button";
import { FaChartLine } from "react-icons/fa";
import Link from "next/link";

export default function SipCalculatorPromo() {
  return (
    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl overflow-hidden shadow-md mb-4">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="bg-white/20 rounded-full p-2 mr-2">
            <FaChartLine className="text-white" />
          </div>
          <h4 className="text-white text-base font-bold">SIP Calculator</h4>
        </div>
        <p className="text-green-100 text-xs mb-3">
          Plan your investments with our advanced SIP calculator. Calculate returns, wealth gain, and more.
        </p>
        <ul className="text-xs text-white/90 mb-3 space-y-1">
          <li className="flex items-center">
            <span className="mr-1.5 text-xs">•</span>
            <span>Detailed yearly breakdown</span>
          </li>
          <li className="flex items-center">
            <span className="mr-1.5 text-xs">•</span>
            <span>Step-up SIP options</span>
          </li>
          <li className="flex items-center">
            <span className="mr-1.5 text-xs">•</span>
            <span>Inflation-adjusted returns</span>
          </li>
        </ul>
        <Link href="/tool/sip-calculator">
          <Button className="w-full bg-white text-green-600 hover:bg-green-50 h-8 text-xs">
            Try Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

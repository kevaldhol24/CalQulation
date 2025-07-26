"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCalculator } from "react-icons/fa";
import { useMobileApp } from "@/contexts/MobileAppContext";
import { handleNavigation } from "@/utils/navigation";

export default function EmiCalculatorPromo() {
  const { isMobileApp } = useMobileApp();
  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl overflow-hidden shadow-md mb-4">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="bg-white/20 rounded-full p-2 mr-2">
            <FaCalculator className="text-white" />
          </div>
          <h4 className="text-white text-base font-bold">EMI Calculator</h4>
        </div>
        <p className="text-blue-100 text-xs mb-3">
          Calculate your loan EMI, total interest payable, and view detailed amortization schedules.
        </p>
        <ul className="text-xs text-white/90 mb-3 space-y-1">
          <li className="flex items-center">
            <span className="mr-1.5 text-xs">•</span>
            <span>Instant EMI calculation</span>
          </li>
          <li className="flex items-center">
            <span className="mr-1.5 text-xs">•</span>
            <span>Prepayment options</span>
          </li>
          <li className="flex items-center">
            <span className="mr-1.5 text-xs">•</span>
            <span>Visual charts &amp; graphs</span>
          </li>
        </ul>
        {isMobileApp ? (
          <Button 
            data-target="/tool/emi-calculator"
            className="w-full bg-white text-blue-600 hover:bg-blue-50 h-8 text-xs navigate-btn"
            onClick={() => handleNavigation('/tool/emi-calculator', isMobileApp)}
          >
            Try Now
          </Button>
        ) : (
          <Link href="/tool/emi-calculator">
            <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 h-8 text-xs">
              Try Now
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

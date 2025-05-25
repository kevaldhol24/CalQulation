import Link from "next/link";
import { BsCalculator } from "react-icons/bs";
import { FaChartLine, FaChevronDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HeaderClient } from "./HeaderClient";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {  return (
    <header className="bg-transparent sticky top-0 z-50">
      <HeaderClient />
      <div className="container flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <Link href="/" className="flex items-center group">
          <Logo flag />
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-white">
          <Link
            href="/tool/emi-calculator"
            className="px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors"
          >
            EMI Calculator
          </Link>

          <Link
            href="/contact"
            className="px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors"
          >
            Contact Us
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                Coming Soon <FaChevronDown size={12} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                disabled
                className="flex items-center gap-2 opacity-70"
              >
                <BsCalculator size={14} /> SIP Calculator
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="flex items-center gap-2 opacity-70"
              >
                <FaChartLine size={14} /> Compound Interest
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="flex items-center gap-2 opacity-70"
              >
                <RiMoneyDollarCircleFill size={14} /> Tax Calculator
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-4">
          {/* Mobile menu - shown only on small screens */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
                <GiHamburgerMenu className="text-white"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] md:hidden">
              <DropdownMenuItem asChild>
                <Link
                  href="/tool/emi-calculator"
                  className="flex items-center gap-2"
                >
                  <BsCalculator size={14} /> EMI Calculator
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/contact"
                  className="flex items-center gap-2"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    width="14" 
                    height="14" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="14" x="3" y="5" rx="2" />
                    <polyline points="21 9 12 15 3 9" />
                  </svg> Contact Us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="flex items-center gap-2 opacity-70"
              >
                <FaChartLine size={14} /> Compound Interest
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="flex items-center gap-2 opacity-70"
              >
                <RiMoneyDollarCircleFill size={14} /> Tax Calculator
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

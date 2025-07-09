import Link from "next/link";
import { CurrencySelector } from "./CurrencySelector";
import { HeaderClient } from "./HeaderClient";
import { Logo } from "./Logo";
import { MobileSidebar } from "./MobileSidebar";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="bg-transparent sticky top-0 z-50">
      <HeaderClient />
      <div className="container flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <Link href="/" className="flex items-center group">
          <Logo flag />
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-white">
          <Link
            href="/blog"
            className="px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/tool/emi-calculator"
            className="px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors"
          >
            EMI Calculator
          </Link>
          <Link
            href="/tool/sip-calculator"
            className="px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors"
          >
            SIP Calculator
          </Link>
          <Link
            href="/tools"
            className="px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors"
          >
            All Tools
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {/* Currency Selector - shown only on desktop */}
          <div className="hidden md:block">
            <CurrencySelector />
          </div>

          {/* Mobile menu - shown only on small screens */}
          <MobileSidebar />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

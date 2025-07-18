"use client";

import { NewspaperIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BsAndroid2, BsCalculator } from "react-icons/bs";
import { FaChartLine, FaTools } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CurrencySelector } from "./CurrencySelector";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
          <GiHamburgerMenu className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[350px] overflow-auto"
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-2 px-4">
          {/* Currency Selector */}
          <div className="pb-4 border-b">
            <CurrencySelector />
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <Link
              href="/app"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
              onClick={handleLinkClick}
            >
              <BsAndroid2 size={18} />
              <span>App</span>
            </Link>

            <Link
              href="/blog"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
              onClick={handleLinkClick}
            >
              <NewspaperIcon size={18} />
              <span>Blog</span>
            </Link>

            <Link
              href="/tool/emi-calculator"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
              onClick={handleLinkClick}
            >
              <BsCalculator size={18} />
              <span>EMI Calculator</span>
            </Link>

            <Link
              href="/tool/sip-calculator"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
              onClick={handleLinkClick}
            >
              <FaChartLine size={18} />
              <span>SIP Calculator</span>
            </Link>

            <Link
              href="/tools"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
              onClick={handleLinkClick}
            >
              <FaTools size={18} />
              <span>All Tools</span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
              onClick={handleLinkClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="14" x="3" y="5" rx="2" />
                <polyline points="21 9 12 15 3 9" />
              </svg>
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Coming Soon Section */}
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-2 text-muted-foreground">
              Coming Soon
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md opacity-50 cursor-not-allowed">
                <FaChartLine size={18} />
                <span>Compound Interest</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md opacity-50 cursor-not-allowed">
                <RiMoneyDollarCircleFill size={18} />
                <span>Tax Calculator</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

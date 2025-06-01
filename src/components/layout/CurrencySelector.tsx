"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SupportedCurrencies } from "@/lib/constants";
import { getCurrencyCookie, setCurrencyCookie, getCurrentCurrency } from "@/services/CurrencyService";
import { FaChevronDown } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export function CurrencySelector() {
  const [currentCurrency, setCurrentCurrency] = useState(() => getCurrentCurrency());
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Update state when component mounts to reflect the current cookie value
    const cookieData = getCurrencyCookie();
    if (cookieData) {
      setCurrentCurrency(cookieData);
    }
  }, []);

  const handleCurrencyChange = (currencyData: typeof SupportedCurrencies[0]) => {
    setIsLoading(true);
    setCurrencyCookie(currencyData);
    setCurrentCurrency(currencyData);
    
    // Refresh the page to update all currency formatting
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  if (!isClient) {
    return (
      <Button 
        variant="outline" 
        size="sm"
        className="bg-input/5 hover:bg-input/10 !border-[#ffffff26] text-white hover:text-white h-9 px-3"
        disabled
      >
        <span className="text-lg mr-2">🇮🇳</span>
        <span className="font-medium">₹</span>
        <FaChevronDown className="ml-2 h-3 w-3" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-input/5 hover:bg-input/10 !border-[#ffffff26] text-white hover:text-white h-9 px-3"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <span className="text-lg mr-2">{currentCurrency.flagEmoji}</span>
              <span className="font-medium">{currentCurrency.symbol}</span>
            </>
          )}
          <FaChevronDown className="ml-2 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[260px]">
        <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
          Select Currency
        </div>
        {SupportedCurrencies.map((currency) => (
          <DropdownMenuItem
            key={currency.currency}
            onClick={() => handleCurrencyChange(currency)}
            className={`flex items-center gap-3 cursor-pointer p-3 ${
              currentCurrency.currency === currency.currency 
                ? "bg-accent text-accent-foreground" 
                : ""
            }`}
          >
            <span className="text-xl">{currency.flagEmoji}</span>
            <div className="flex flex-col flex-1">
              <span className="font-medium">
                {currency.symbol} {currency.currency}
              </span>
              <span className="text-xs text-muted-foreground">
                {currency.label.split(' - ')[1]}
              </span>
            </div>
            {currentCurrency.currency === currency.currency && (
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

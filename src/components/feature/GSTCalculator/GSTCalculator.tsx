"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGST } from "@/contexts/GSTContext";
import { Calculator, Receipt, Percent, IndianRupee, Check } from "lucide-react";
import GSTSummary from "./GSTSummary";

const GSTCalculator: React.FC = () => {
  const {
    gstInputs,
    updateGSTInputs,
    commonGSTRates,
  } = useGST();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateGSTInputs({ amount: value });
  };

  const handleCalculationTypeChange = (type: "inclusive" | "exclusive") => {
    updateGSTInputs({ calculationType: type });
  };

  const setQuickGSTRate = (rate: number) => {
    updateGSTInputs({ gstRate: rate });
  };

  const handleCustomRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    if (value >= 0 && value <= 100) {
      updateGSTInputs({ gstRate: value });
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-2 p-2 sm:p-0">
      {/* Input Panel */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="flex items-center gap-2 text-green-800 dark:text-green-200 text-lg font-semibold mb-2">
              <Calculator className="h-5 w-5" />
              GST Calculator
            </h3>
            <p className="text-sm text-green-600 dark:text-green-300">
              Calculate GST inclusive or exclusive amounts with precision
            </p>
          </div>
          <div className="p-6 pt-0 space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <label htmlFor="amount" className="text-green-800 dark:text-green-200 font-medium text-sm">
                Amount
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600 dark:text-green-300" />
                <Input
                  id="amount"
                  type="number"
                  value={gstInputs.amount || ""}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  className="pl-10 border-green-200 dark:border-green-700 focus:border-green-400 dark:focus:border-green-500 dark:bg-gray-800 dark:text-white"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Calculation Type */}
            <div className="space-y-3 mt-6">
              <label className="text-green-800 dark:text-green-200 font-medium text-sm">
                Tax Calculation Type
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => handleCalculationTypeChange("exclusive")}
                  className={`relative flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                    gstInputs.calculationType === "exclusive"
                      ? "border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-500"
                      : "border-green-200 dark:border-green-700 bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                  }`}
                >
                  <div className="text-left flex-1">
                    <div className={`font-medium ${
                      gstInputs.calculationType === "exclusive"
                        ? "text-green-700 dark:text-green-300"
                        : "text-green-700 dark:text-green-300"
                    }`}>
                      Exclusive (Add GST to amount)
                    </div>
                    <div className={`text-xs mt-1 ${
                      gstInputs.calculationType === "exclusive"
                        ? "text-green-600 dark:text-green-400"
                        : "text-green-600 dark:text-green-400 opacity-80"
                    }`}>
                      GST will be added to the entered amount
                    </div>
                  </div>
                  {gstInputs.calculationType === "exclusive" && (
                    <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>
                <button
                  onClick={() => handleCalculationTypeChange("inclusive")}
                  className={`relative flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                    gstInputs.calculationType === "inclusive"
                      ? "border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-500"
                      : "border-green-200 dark:border-green-700 bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                  }`}
                >
                  <div className="text-left flex-1">
                    <div className={`font-medium ${
                      gstInputs.calculationType === "inclusive"
                        ? "text-green-700 dark:text-green-300"
                        : "text-green-700 dark:text-green-300"
                    }`}>
                      Inclusive (GST included in amount)
                    </div>
                    <div className={`text-xs mt-1 ${
                      gstInputs.calculationType === "inclusive"
                        ? "text-green-600 dark:text-green-400"
                        : "text-green-600 dark:text-green-400 opacity-80"
                    }`}>
                      GST is already included in the entered amount
                    </div>
                  </div>
                  {gstInputs.calculationType === "inclusive" && (
                    <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* GST Rate Selection */}
            <div className="space-y-3">
              <label className="text-green-800 dark:text-green-200 font-medium text-sm">
                GST Rate (%)
              </label>
              
              {/* Quick Rate Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {commonGSTRates.map((rateOption) => (
                  <Button
                    key={rateOption.rate}
                    variant={gstInputs.gstRate === rateOption.rate ? "default" : "outline"}
                    size="sm"
                    onClick={() => setQuickGSTRate(rateOption.rate)}
                    className={`text-xs ${
                      gstInputs.gstRate === rateOption.rate 
                        ? "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700" 
                        : "border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
                    }`}
                  >
                    {rateOption.rate}%
                  </Button>
                ))}
              </div>

              {/* Custom Rate Input */}
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600 dark:text-green-300" />
                <Input
                  type="number"
                  value={gstInputs.gstRate || ""}
                  onChange={handleCustomRateChange}
                  placeholder="Custom GST rate"
                  className="pl-10 border-green-200 dark:border-green-700 focus:border-green-400 dark:focus:border-green-500 dark:bg-gray-800 dark:text-white"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
            </div>

            {/* GST Rate Info */}
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="h-4 w-4 text-green-600 dark:text-green-300" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  GST Rate Categories
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1 text-xs text-green-700 dark:text-green-300">
                {commonGSTRates.map((rate) => (
                  <div key={rate.rate} className="flex justify-between">
                    <span>{rate.rate}%</span>
                    <span>{rate.label.split("(")[1]?.replace(")", "") || rate.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="space-y-6">
        <GSTSummary />
      </div>
    </div>
  );
};

export default GSTCalculator;

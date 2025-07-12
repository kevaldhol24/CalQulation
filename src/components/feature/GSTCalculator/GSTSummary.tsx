"use client";

import { useGST } from "@/contexts/GSTContext";
import { 
  Calculator, 
  IndianRupee, 
  TrendingUp, 
  Receipt, 
  Percent,
  Building 
} from "lucide-react";
import { GSTService } from "@/services/GSTService";

const GSTSummary: React.FC = () => {
  const { gstResults, gstInputs, isLoading } = useGST();

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="flex items-center gap-2 text-blue-800 dark:text-blue-200 text-lg font-semibold mb-2">
            <Calculator className="h-5 w-5" />
            GST Calculation Results
          </h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-center text-blue-600 dark:text-blue-300 py-8">
            Calculating...
          </div>
        </div>
      </div>
    );
  }

  if (!gstResults) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="flex items-center gap-2 text-blue-800 dark:text-blue-200 text-lg font-semibold mb-2">
            <Calculator className="h-5 w-5" />
            GST Calculation Results
          </h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-center text-blue-600 dark:text-blue-300 py-8">
            Enter amount and GST rate to see results
          </div>
        </div>
      </div>
    );
  }

  const isExclusive = gstInputs.calculationType === "exclusive";

  return (
    <div className="space-y-2">
      {/* Main Results Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="flex items-center gap-2 text-blue-800 dark:text-blue-200 text-lg font-semibold mb-2">
            <Calculator className="h-5 w-5" />
            GST Calculation Results
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            {isExclusive ? "GST added to amount" : "GST extracted from amount"}
          </p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          {/* Net Amount */}
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <IndianRupee className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <div className="text-sm text-blue-600 dark:text-blue-300">Net Amount</div>
                <div className="text-xs text-blue-500 dark:text-blue-400">
                  Amount {isExclusive ? "before" : "after excluding"} GST
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                {GSTService.formatCurrency(gstResults.netAmount)}
              </div>
            </div>
          </div>

          {/* GST Amount */}
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-green-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                <Percent className="h-4 w-4 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <div className="text-sm text-green-600 dark:text-green-300">GST Amount</div>
                <div className="text-xs text-green-500 dark:text-green-400">
                  @ {gstInputs.gstRate}% GST Rate
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-green-800 dark:text-green-200">
                {GSTService.formatCurrency(gstResults.gstAmount)}
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <div className="text-sm text-purple-600 dark:text-purple-300 font-medium">Total Amount</div>
                <div className="text-xs text-purple-500 dark:text-purple-400">
                  Net Amount + GST
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-purple-800 dark:text-purple-200">
                {GSTService.formatCurrency(gstResults.totalAmount)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GST Breakdown Card */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-700 rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="flex items-center gap-2 text-orange-800 dark:text-orange-200 text-lg font-semibold mb-2">
            <Receipt className="h-5 w-5" />
            GST Breakdown
          </h3>
          <p className="text-sm text-orange-600 dark:text-orange-300">
            Component-wise GST distribution
          </p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          {/* CGST & SGST (Intra-state) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-100 dark:border-orange-700">
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-4 w-4 text-orange-600 dark:text-orange-300" />
                <span className="text-sm font-medium text-orange-800 dark:text-orange-200">CGST</span>
              </div>
              <div className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                {GSTService.formatCurrency(gstResults.gstAmount / 2)}
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400">
                {(gstInputs.gstRate / 2).toFixed(2)}% Central GST
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-100 dark:border-orange-700">
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-4 w-4 text-orange-600 dark:text-orange-300" />
                <span className="text-sm font-medium text-orange-800 dark:text-orange-200">SGST</span>
              </div>
              <div className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                {GSTService.formatCurrency(gstResults.gstAmount / 2)}
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400">
                {(gstInputs.gstRate / 2).toFixed(2)}% State GST
              </div>
            </div>
          </div>

          {/* IGST (Inter-state) */}
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-100 dark:border-orange-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-orange-600 dark:text-orange-300" />
                <div>
                  <div className="text-sm font-medium text-orange-800 dark:text-orange-200">IGST</div>
                  <div className="text-xs text-orange-600 dark:text-orange-400">
                    {gstInputs.gstRate}% Integrated GST (Inter-state)
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                {GSTService.formatCurrency(gstResults.gstAmount)}
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="text-xs text-orange-600 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
            <strong>Note:</strong> For intra-state transactions, use CGST + SGST. 
            For inter-state transactions, use IGST.
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSTSummary;

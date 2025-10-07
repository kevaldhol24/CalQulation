"use client";

import { Button } from "@/components/ui/button";
import { 
  FaHeartbeat, 
  FaChartLine, 
  FaShieldAlt, 
  FaPiggyBank, 
  FaLightbulb,
  FaClock
} from "react-icons/fa";

interface QuizIntroProps {
  onStart: () => void;
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Introduction Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeartbeat className="text-4xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            What&apos;s Your Financial Health Score?
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Take our comprehensive 10-question quiz to assess your financial wellness and get personalized recommendations
          </p>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaClock className="text-emerald-600 dark:text-emerald-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Quick Assessment
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Takes only 5-7 minutes to complete with instant results
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaChartLine className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Comprehensive Analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Covers income, savings, debt, investments, and financial planning
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaLightbulb className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Personalized Recommendations
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get tailored advice and links to relevant financial calculators
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaShieldAlt className="text-amber-600 dark:text-amber-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy First
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your data stays with you - no registration required
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={onStart}
              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Financial Health Quiz
            </Button>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          What You&apos;ll Discover
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaPiggyBank className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Savings Health
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Assess your savings rate and emergency fund adequacy
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaChartLine className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Investment Readiness
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Evaluate your investment knowledge and portfolio allocation
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Risk Protection
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Check your insurance coverage and debt management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
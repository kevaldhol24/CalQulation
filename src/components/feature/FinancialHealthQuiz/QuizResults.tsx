"use client";

import { Button } from "@/components/ui/button";
import { FinancialHealthScore, QuizAnswers } from "./types";
import { 
  FaHeartbeat, 
  FaChartLine, 
  FaLightbulb, 
  FaCalculator,
  FaRedo,
  FaTrophy,
  FaExclamationTriangle,
  FaInfoCircle
} from "react-icons/fa";
import Link from "next/link";

interface QuizResultsProps {
  score: FinancialHealthScore;
  answers: QuizAnswers;
  onRestart: () => void;
}

const CALCULATOR_RECOMMENDATIONS = [
  {
    title: "EMI Calculator",
    description: "Calculate loan EMIs and plan debt repayment",
    href: "/tool/loan-calculator",
    icon: FaCalculator,
    color: "blue",
    keywords: ["debt", "loan", "emi"]
  },
  {
    title: "SIP Calculator",
    description: "Plan systematic investment in mutual funds",
    href: "/tool/sip-calculator",
    icon: FaChartLine,
    color: "emerald",
    keywords: ["investment", "sip", "mutual fund"]
  },
  {
    title: "Goal-Based SIP",
    description: "Calculate SIP for specific financial goals",
    href: "/tool/goal-based-sip-calculator",
    icon: FaTrophy,
    color: "purple",
    keywords: ["goal", "planning", "target"]
  },
  {
    title: "FD Calculator",
    description: "Calculate fixed deposit returns and maturity",
    href: "/tool/fd-calculator",
    icon: FaCalculator,
    color: "amber",
    keywords: ["savings", "fixed deposit", "safe investment"]
  }
];

export function QuizResults({ score, answers, onRestart }: QuizResultsProps) {
  const getScoreColor = () => {
    switch (score.level) {
      case "excellent": return "text-emerald-600 dark:text-emerald-400";
      case "good": return "text-blue-600 dark:text-blue-400";
      case "fair": return "text-amber-600 dark:text-amber-400";
      case "poor": return "text-red-600 dark:text-red-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };

  const getScoreGradient = () => {
    switch (score.level) {
      case "excellent": return "from-emerald-500 to-green-600";
      case "good": return "from-blue-500 to-cyan-600";
      case "fair": return "from-amber-500 to-orange-600";
      case "poor": return "from-red-500 to-pink-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getScoreIcon = () => {
    switch (score.level) {
      case "excellent": return FaTrophy;
      case "good": return FaHeartbeat;
      case "fair": return FaInfoCircle;
      case "poor": return FaExclamationTriangle;
      default: return FaHeartbeat;
    }
  };

  const ScoreIcon = getScoreIcon();

  const getRelevantCalculators = () => {
    const relevant: typeof CALCULATOR_RECOMMENDATIONS = [];
    
    // Check debt situation
    const debtRatio = answers.debt_ratio || 0;
    if (debtRatio > 15) {
      relevant.push(CALCULATOR_RECOMMENDATIONS[0]); // EMI Calculator
    }
    
    // Check investment needs
    const investmentKnowledge = answers.investment_knowledge || 0;
    const investmentPercentage = answers.investment_percentage || 0;
    if (investmentKnowledge < 3 || investmentPercentage < 50) {
      relevant.push(CALCULATOR_RECOMMENDATIONS[1]); // SIP Calculator
    }
    
    // Check planning needs
    const goals = answers.financial_goals || 0;
    if (goals < 3) {
      relevant.push(CALCULATOR_RECOMMENDATIONS[2]); // Goal-based SIP
    }
    
    // Check savings approach
    const savingsRate = answers.savings_rate || 0;
    if (savingsRate > 0 && investmentPercentage < 25) {
      relevant.push(CALCULATOR_RECOMMENDATIONS[3]); // FD Calculator
    }
    
    // Always show at least 2 calculators
    if (relevant.length < 2) {
      CALCULATOR_RECOMMENDATIONS.forEach(calc => {
        if (!relevant.includes(calc) && relevant.length < 3) {
          relevant.push(calc);
        }
      });
    }
    
    return relevant.slice(0, 3);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Score Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className={`bg-gradient-to-r ${getScoreGradient()} p-8 text-white text-center`}>
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ScoreIcon className="text-5xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your Financial Health Score
          </h1>
          <div className="text-6xl md:text-7xl font-bold mb-2">
            {score.percentage}
          </div>
          <div className="text-xl opacity-90 mb-4">
            out of 100
          </div>
          <div className="inline-flex items-center px-6 py-2 bg-white/20 rounded-full text-lg font-semibold">
            {score.level.charAt(0).toUpperCase() + score.level.slice(1)} Health
          </div>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            {score.message}
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {score.totalPoints}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Points Earned
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {score.maxPoints}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Max Points
              </div>
            </div>
            <div className={`text-center ${getScoreColor()}`}>
              <div className="text-2xl font-bold">
                {score.level.charAt(0).toUpperCase() + score.level.slice(1)}
              </div>
              <div className="text-sm">
                Health Level
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
            <FaLightbulb className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Personalized Recommendations
          </h2>
        </div>
        
        <div className="space-y-4">
          {score.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Calculators */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
            <FaCalculator className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recommended Tools for You
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {getRelevantCalculators().map((calculator, index) => {
            const IconComponent = calculator.icon;
            const colorClasses = {
              blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
              emerald: "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
              purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
              amber: "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            };
            
            return (
              <Link key={index} href={calculator.href} className="group">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-600">
                  <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[calculator.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <IconComponent className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {calculator.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {calculator.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRestart}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3"
          >
            <FaRedo className="text-sm" />
            Retake Quiz
          </Button>
          
          <Link href="/tools">
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-6 py-3 flex items-center gap-2">
              Explore All Tools
              <FaCalculator className="text-sm" />
            </Button>
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Your results are private and not stored. Bookmark this page or retake the quiz anytime to track your progress.
        </p>
      </div>
    </div>
  );
}
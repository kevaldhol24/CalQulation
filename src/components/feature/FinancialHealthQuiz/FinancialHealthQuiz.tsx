"use client";

import { useState } from "react";
import { QuizIntro } from "./QuizIntro";
import { QuizQuestions } from "./QuizQuestions";
import { QuizResults } from "./QuizResults";
import { QuizQuestion, QuizAnswers, FinancialHealthScore } from "./types";

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "income",
    title: "Monthly Income",
    subtitle: "What is your approximate monthly income?",
    type: "range",
    min: 0,
    max: 500000,
    step: 5000,
    defaultValue: 50000,
    suffix: "₹",
    category: "income",
  },
  {
    id: "savings_rate",
    title: "Savings Rate",
    subtitle: "What percentage of your income do you save monthly?",
    type: "multiple_choice",
    options: [
      { value: 0, label: "I don't save anything (0%)", points: 0 },
      { value: 5, label: "Very little (1-10%)", points: 2 },
      { value: 15, label: "Some savings (11-20%)", points: 6 },
      { value: 25, label: "Good savings (21-30%)", points: 8 },
      { value: 35, label: "Excellent savings (30%+)", points: 10 },
    ],
    category: "savings",
  },
  {
    id: "emergency_fund",
    title: "Emergency Fund",
    subtitle: "How many months of expenses can you cover with your emergency fund?",
    type: "multiple_choice",
    options: [
      { value: 0, label: "No emergency fund", points: 0 },
      { value: 1, label: "Less than 3 months", points: 3 },
      { value: 2, label: "3-6 months", points: 8 },
      { value: 3, label: "6-12 months", points: 10 },
      { value: 4, label: "More than 12 months", points: 9 },
    ],
    category: "savings",
  },
  {
    id: "debt_ratio",
    title: "Debt-to-Income Ratio",
    subtitle: "What percentage of your monthly income goes to debt payments (EMIs, credit cards)?",
    type: "multiple_choice",
    options: [
      { value: 0, label: "No debt (0%)", points: 10 },
      { value: 15, label: "Low debt (1-20%)", points: 8 },
      { value: 30, label: "Moderate debt (21-40%)", points: 6 },
      { value: 50, label: "High debt (41-60%)", points: 3 },
      { value: 70, label: "Very high debt (60%+)", points: 0 },
    ],
    category: "debt",
  },
  {
    id: "investment_knowledge",
    title: "Investment Knowledge",
    subtitle: "How would you rate your investment knowledge?",
    type: "multiple_choice",
    options: [
      { value: 0, label: "No knowledge - I don't invest", points: 0 },
      { value: 1, label: "Beginner - Basic savings accounts only", points: 2 },
      { value: 2, label: "Some knowledge - Fixed deposits, PPF", points: 4 },
      { value: 3, label: "Good knowledge - Mutual funds, SIPs", points: 7 },
      { value: 4, label: "Advanced - Stocks, bonds, diversified portfolio", points: 10 },
    ],
    category: "investment",
  },
  {
    id: "investment_percentage",
    title: "Investment Allocation",
    subtitle: "What percentage of your savings do you actively invest (beyond savings accounts)?",
    type: "multiple_choice",
    options: [
      { value: 0, label: "0% - All in savings accounts", points: 0 },
      { value: 25, label: "1-25% - Mostly savings", points: 3 },
      { value: 50, label: "26-50% - Balanced approach", points: 6 },
      { value: 75, label: "51-75% - Investment focused", points: 8 },
      { value: 90, label: "75%+ - Mostly invested", points: 10 },
    ],
    category: "investment",
  },
  {
    id: "insurance_coverage",
    title: "Insurance Coverage",
    subtitle: "What insurance coverage do you have?",
    type: "multiple_choice",
    options: [
      { value: 0, label: "No insurance coverage", points: 0 },
      { value: 1, label: "Basic health insurance only", points: 3 },
      { value: 2, label: "Health + Life insurance", points: 6 },
      { value: 3, label: "Comprehensive coverage (Health, Life, Disability)", points: 10 },
    ],
    category: "protection",
  },
  {
    id: "financial_goals",
    title: "Financial Planning",
    subtitle: "How well have you planned for your financial goals?",
    type: "multiple_choice",
    options: [
      { value: 0, label: "No specific financial goals", points: 0 },
      { value: 1, label: "Have goals but no clear plan", points: 2 },
      { value: 2, label: "Have goals with basic planning", points: 5 },
      { value: 3, label: "Well-defined goals with detailed plans", points: 8 },
      { value: 4, label: "Comprehensive financial plan with regular reviews", points: 10 },
    ],
    category: "planning",
  },
  {
    id: "retirement_planning",
    title: "Retirement Planning",
    subtitle: "How are you preparing for retirement?",
    type: "multiple_choice",
    options: [
      { value: 0, label: "Haven't thought about retirement", points: 0 },
      { value: 1, label: "Relying only on EPF/PF", points: 2 },
      { value: 2, label: "EPF + Some additional savings", points: 4 },
      { value: 3, label: "Systematic retirement planning with SIPs/investments", points: 8 },
      { value: 4, label: "Comprehensive retirement strategy", points: 10 },
    ],
    category: "planning",
  },
  {
    id: "financial_stress",
    title: "Financial Stress",
    subtitle: "How often do you worry about money?",
    type: "multiple_choice",
    options: [
      { value: 0, label: "Constantly worried about money", points: 0 },
      { value: 1, label: "Often stressed about finances", points: 2 },
      { value: 2, label: "Sometimes worried", points: 5 },
      { value: 3, label: "Rarely worried about money", points: 8 },
      { value: 4, label: "Very confident about my finances", points: 10 },
    ],
    category: "stability",
  },
];

export function FinancialHealthQuiz() {
  const [currentStep, setCurrentStep] = useState<"intro" | "quiz" | "results">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [score, setScore] = useState<FinancialHealthScore | null>(null);

  const handleStartQuiz = () => {
    setCurrentStep("quiz");
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev: QuizAnswers) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate score and show results
      calculateScore();
      setCurrentStep("results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let maxPoints = 0;

    QUIZ_QUESTIONS.forEach(question => {
      const answer = answers[question.id];
      if (answer !== undefined) {
        if (question.type === "multiple_choice" && question.options) {
          const selectedOption = question.options.find((opt) => opt.value === answer);
          if (selectedOption) {
            totalPoints += selectedOption.points;
          }
          maxPoints += Math.max(...question.options.map((opt) => opt.points));
        } else if (question.type === "range") {
          // For income, give points based on range
          if (question.id === "income") {
            const incomeValue = answer;
            if (incomeValue >= 100000) totalPoints += 10;
            else if (incomeValue >= 75000) totalPoints += 8;
            else if (incomeValue >= 50000) totalPoints += 6;
            else if (incomeValue >= 30000) totalPoints += 4;
            else if (incomeValue >= 15000) totalPoints += 2;
            maxPoints += 10;
          }
        }
      }
    });

    const percentage = Math.round((totalPoints / maxPoints) * 100);
    
    let level: "poor" | "fair" | "good" | "excellent";
    let message: string;

    if (percentage >= 80) {
      level = "excellent";
      message = "Outstanding! You have excellent financial health.";
    } else if (percentage >= 60) {
      level = "good";
      message = "Great job! Your financial health is good with room for optimization.";
    } else if (percentage >= 40) {
      level = "fair";
      message = "You're on the right track but there's significant room for improvement.";
    } else {
      level = "poor";
      message = "Your financial health needs immediate attention and improvement.";
    }

    // Generate recommendations based on answers
    const recommendations = generateRecommendations(answers);

    setScore({
      totalPoints,
      maxPoints,
      percentage,
      level,
      message,
      recommendations,
    });
  };

  const generateRecommendations = (answers: QuizAnswers): string[] => {
    const recommendations: string[] = [];

    // Savings recommendations
    const savingsRate = answers.savings_rate || 0;
    if (savingsRate < 15) {
      recommendations.push("Increase your savings rate to at least 20% of your income");
    }

    // Emergency fund recommendations
    const emergencyFund = answers.emergency_fund || 0;
    if (emergencyFund < 2) {
      recommendations.push("Build an emergency fund covering 3-6 months of expenses");
    }

    // Debt recommendations
    const debtRatio = answers.debt_ratio || 0;
    if (debtRatio > 30) {
      recommendations.push("Reduce your debt-to-income ratio below 40%");
    }

    // Investment recommendations
    const investmentKnowledge = answers.investment_knowledge || 0;
    const investmentPercentage = answers.investment_percentage || 0;
    if (investmentKnowledge < 2 || investmentPercentage < 25) {
      recommendations.push("Start investing in diversified mutual funds through SIPs");
    }

    // Insurance recommendations
    const insurance = answers.insurance_coverage || 0;
    if (insurance < 2) {
      recommendations.push("Get adequate health and life insurance coverage");
    }

    // Planning recommendations
    const goals = answers.financial_goals || 0;
    const retirement = answers.retirement_planning || 0;
    if (goals < 2 || retirement < 2) {
      recommendations.push("Create a comprehensive financial plan with clear goals");
    }

    return recommendations;
  };

  const handleRestartQuiz = () => {
    setCurrentStep("intro");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(null);
  };

  if (currentStep === "intro") {
    return <QuizIntro onStart={handleStartQuiz} />;
  }

  if (currentStep === "results" && score) {
    return <QuizResults score={score} answers={answers} onRestart={handleRestartQuiz} />;
  }

  return (
    <QuizQuestions
      questions={QUIZ_QUESTIONS}
      currentQuestionIndex={currentQuestionIndex}
      answers={answers}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}
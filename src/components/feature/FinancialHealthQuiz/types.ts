export interface QuizOption {
  value: number;
  label: string;
  points: number;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  type: "multiple_choice" | "range";
  options?: QuizOption[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  suffix?: string;
  category: "income" | "savings" | "debt" | "investment" | "protection" | "planning" | "stability";
}

export interface QuizAnswers {
  [key: string]: number;
}

export interface FinancialHealthScore {
  totalPoints: number;
  maxPoints: number;
  percentage: number;
  level: "poor" | "fair" | "good" | "excellent";
  message: string;
  recommendations: string[];
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
}
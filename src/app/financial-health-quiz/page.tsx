import { PageHero } from "@/components/common/PageHero";
import { FinancialHealthQuiz } from "@/components/feature/FinancialHealthQuiz/FinancialHealthQuiz";
import { Metadata } from "next";
import { FaHeartbeat } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Financial Health Quiz | Calqulation - Assess Your Financial Wellness",
  description:
    "Take our comprehensive financial health quiz to assess your financial wellness. Get personalized recommendations and discover the right financial tools for your situation.",
  keywords:
    "financial health quiz, financial wellness assessment, financial score, personal finance evaluation, financial planning quiz, money management assessment",
  openGraph: {
    title: "Financial Health Quiz | Calqulation - Assess Your Financial Wellness",
    description:
      "Take our comprehensive financial health quiz to assess your financial wellness. Get personalized recommendations and discover the right financial tools for your situation.",
    url: "https://www.calqulation.com/financial-health-quiz",
    images: [
      {
        url: "/Financial-planning.svg",
        width: 1200,
        height: 630,
        alt: "Financial Health Quiz",
      },
    ],
  },
};

export default async function FinancialHealthQuizPage() {
  const cookieStore = await cookies();
  const isMobileAppCookie = cookieStore.get("is-mobile-app");
  const isMobileApp = isMobileAppCookie?.value === "true";

  // Schema.org structured data for the quiz
  const quizSchemaJson = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Financial Health Quiz",
    description:
      "Comprehensive financial wellness assessment with personalized recommendations",
    about: {
      "@type": "Thing",
      name: "Personal Finance",
    },
    educationalLevel: "Beginner to Advanced",
    teaches: [
      "Financial Planning",
      "Budgeting",
      "Investment Basics",
      "Debt Management",
    ],
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(quizSchemaJson),
        }}
      />

      {!isMobileApp && (
        <PageHero
          title="Financial Health Quiz"
          subtitle="Discover your financial wellness score and get personalized recommendations to improve your financial future."
          Icon={FaHeartbeat}
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Financial Health Quiz", href: "/financial-health-quiz" },
            ]}
            className="text-gray-300"
          />
        </PageHero>
      )}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FinancialHealthQuiz />
      </div>
    </div>
  );
}
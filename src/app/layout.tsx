import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Footer } from "@/components/layout";
import { NavigationProgress } from "@/components/layout/NavigationProgress";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calqulation | Smart Financial Calculation Tools",
  description:
    "Advanced financial calculators to plan your loans, investments, and financial future with confidence. Calculate EMIs, interest rates, and more.",
  keywords:
    "loan calculator, EMI calculator, financial tools, loan EMI, home loan calculator, car loan calculator, prepayment calculator, financial planning",
  authors: [{ name: "Calqulation Team" }],
  creator: "Calqulation",
  publisher: "Calqulation",
  applicationName: "Calqulation",
  openGraph: {
    title: "Calqulation | Smart Financial Calculation Tools",
    description:
      "Advanced financial calculators to plan your loans, investments, and financial future with confidence. Calculate EMIs, interest rates, and more.",
    url: "https://calqulation.com",
    siteName: "Calqulation",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Calqulation.png",
        width: 1200,
        height: 630,
        alt: "Calqulation Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calqulation | Smart Financial Calculation Tools",
    description:
      "Advanced financial calculators to plan your loans, investments, and financial future with confidence.",
    images: ["/Calqulation.png"],
  },
  metadataBase: new URL("https://calqulation.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://calqulation.com" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Suspense
            fallback={<div className="h-1 bg-gray-200 dark:bg-gray-800"></div>}
          >
            <NavigationProgress />
          </Suspense>
          {children}
          <Toaster position="top-right" />
          <Footer />
        </ThemeProvider>

        {/* Structured data for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Calqulation",
              url: "https://calqulation.com",
              description:
                "Advanced financial calculators to plan your loans, investments, and financial future with confidence.",
              applicationCategory: "FinanceApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
              operatingSystem: "Web browser",
            }),
          }}
        />
      </body>
    </html>
  );
}

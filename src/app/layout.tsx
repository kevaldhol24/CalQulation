import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { NavigationProgress } from "@/components/layout/NavigationProgress";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { MobileAppProvider } from "@/contexts/MobileAppContext";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { cookies } from "next/headers";

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
  alternates: {
    canonical: "https://www.calqulation.com",
  },
  openGraph: {
    title: "Calqulation | Smart Financial Calculation Tools",
    description:
      "Advanced financial calculators to plan your loans, investments, and financial future with confidence. Calculate EMIs, interest rates, and more.",
    url: "https://www.calqulation.com",
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
  metadataBase: new URL("https://www.calqulation.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if request is from mobile app using server-side cookies
  const cookieStore = await cookies();
  const isMobileAppCookie = cookieStore.get("is-mobile-app");
  const initialIsMobileApp = isMobileAppCookie?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.calqulation.com" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3051538767280870"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MobileAppProvider initialIsMobileApp={initialIsMobileApp}>
            <Suspense
              fallback={
                <div className="h-1 bg-gray-200 dark:bg-gray-800"></div>
              }
            >
              <NavigationProgress />
            </Suspense>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster position="top-right" />
          </MobileAppProvider>
        </ThemeProvider>

        {/* Structured data for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Calqulation",
              url: "https://www.calqulation.com",
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

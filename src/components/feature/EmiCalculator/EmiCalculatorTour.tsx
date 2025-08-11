"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Joyride, {
  CallBackProps,
  STATUS,
  Step,
  TooltipRenderProps,
} from "react-joyride";
import { isWebViewEnvironment, supportsBackdropFilter } from "@/lib/mobile-app-detection";

interface EmiCalculatorTourProps {
  storageKey?: string;
}
const TOUR_STORAGE_KEY = "emiTourSeen";

const isDarkMode = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

// Custom tooltip component for modern styling
const Tooltip: React.FC<TooltipRenderProps> = ({
  index,
  size,
  step,
  backProps,
  primaryProps,
  skipProps,
  closeProps,
  isLastStep,
}) => {
  const dark = isDarkMode();
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-xl border relative ${
        dark
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700"
          : "bg-gradient-to-br from-white via-white to-slate-50 border-slate-200"
      } max-w-[calc(100vw-1.5rem)] w-[340px]`}
    >
      <div className="absolute top-2 left-3 text-[10px] tracking-wider font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-600/30 dark:text-indigo-200">
        {index + 1} / {size}
      </div>
      <button
        {...closeProps}
        className="absolute top-1.5 right-1.5 h-8 w-8 inline-flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <span className="text-base leading-none">×</span>
      </button>
      <div className="pt-8 px-5 pb-4">
        {step.title && (
          <h3 className="text-base font-semibold bg-gradient-to-r from-indigo-600 via-violet-500 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-300 dark:to-pink-300 mb-2">
            {step.title}
          </h3>
        )}
        {step.content && (
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
            {step.content as React.ReactNode}
          </p>
        )}
      </div>
      <div
        className={`flex items-center gap-2 px-4 pb-4 pt-2 ${
          dark ? "bg-slate-900/60" : "bg-slate-50/70"
        } backdrop-blur-sm`}
      >
        <button
          {...skipProps}
          className="ml-auto text-[11px] font-medium px-3 py-1.5 rounded-md border border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          Skip
        </button>
        {index > 0 && (
          <button
            {...backProps}
            className="text-[11px] font-medium px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 shadow-sm"
          >
            Back
          </button>
        )}
        <button
          {...primaryProps}
          className="text-[11px] font-semibold px-4 py-1.5 rounded-md bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:brightness-110 text-white shadow-md shadow-indigo-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:from-indigo-500 dark:via-violet-500 dark:to-fuchsia-500"
        >
          {isLastStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export const EmiCalculatorTour: React.FC<EmiCalculatorTourProps> = ({
  storageKey = TOUR_STORAGE_KEY,
}) => {
  const [run, setRun] = useState(false);
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false); // first-time dialog

  const steps: Step[] = useMemo(
    () => [
      {
        target: '[data-tour="calculator-wrapper"]',
        placement: "center",
        title: "EMI Calculator Overview",
        content:
          "Welcome! This smart EMI calculator helps you plan loans with precision. We will cover inputs, summaries, and advanced options that simulate real scenarios.",
        disableBeacon: true,
        disableScrolling: true,
      },
      {
        target: '[data-tour="loan-amount"]',
        title: "Loan Amount",
        content:
          "Enter the total principal you intend to borrow. Tip: Adjust this and watch the summary update instantly.",
        placement: "auto",
      },
      {
        target: '[data-tour="interest-rate"]',
        title: "Interest Rate",
        content:
          "Annual rate in percent. Even a 0.25% change can alter total interest significantly. Floating rate? Model future changes later.",
        placement: "auto",
      },
      {
        target: '[data-tour="tenure"]',
        title: "Tenure (Months)",
        content:
          "Total repayment duration. Longer = lower EMI but higher total interest. Shorter = faster payoff and savings.",
        placement: "auto",
      },
      {
        target: '[data-tour="start-month"]',
        title: "Start Month",
        content:
          "Sets when repayment begins. Align with salary cycle or financial planning.",
        placement: "auto",
      },
      {
        target: '[data-tour="summary-cards"]',
        title: "Summary Metrics",
        content:
          "Live EMI, interest, payoff projections, and key aggregates. These recalc instantly as you tweak inputs.",
        placement: "auto",
      },
      {
        target: '[data-tour="advanced-options"]',
        title: "Advanced Options Hub",
        content:
          "Configure prepayments, EMI changes, and rate changes to stress‑test your loan strategy.",
        placement: "auto",
      },
      {
        target: '[data-tour="prepayments-section"]',
        title: "Prepayments",
        content:
          "Add lump sums that reduce principal early. Earlier + larger prepayments compress tenure and cut interest most effectively.",
        placement: "auto",
      },
      {
        target: '[data-tour="emi-change-section"]',
        title: "EMI Change",
        content:
          "Simulate increasing or decreasing EMI mid‑loan (e.g. after a raise or during cash‑flow tight periods). See effect on payoff and total interest.",
        placement: "auto",
      },
      {
        target: '[data-tour="rate-change-section"]',
        title: "Rate Change",
        content:
          "Model future interest rate resets for floating loans. Plan buffers for potential hikes or visualize benefit from drops.",
        placement: "auto",
      },
      {
        target: '[data-tour="loan-charts"]',
        title: "Charts & Visuals",
        content:
          "Graph principal vs interest trajectory and progression. Spot how interventions shift curves.",
        placement: "auto",
      },
      {
        target: '[data-tour="emi-schedule"]',
        title: "EMI Schedule",
        content:
          "Detailed monthly breakdown: EMI split, principal reduction, balance, and applied adjustments. Use it for export or audit.",
        placement: "auto",
      },
      {
        target: '[data-tour="calculator-wrapper"]',
        placement: "center",
        title: "You Are Ready",
        content:
          'Experiment, optimize, and re-run this guide anytime via the "How to Use" button.',
        disableScrolling: true,
      },
    ],
    []
  );

  const startTour = useCallback(
    (force = false) => {
      if (typeof window === "undefined") return;
      const seen = localStorage.getItem(storageKey);
      if (!seen || force) {
        // Do NOT mark as seen here when forced restart, only after completion/dismissal
        if (!force) localStorage.setItem(storageKey, "1");
        setRun(true);
        setShowPrompt(false);
      }
    },
    [storageKey]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDark(isDarkMode());
    setReady(true);
    // Instead of auto start, show prompt if not seen
    const seen = localStorage.getItem(storageKey);
    if (!seen) {
      setShowPrompt(true);
    }

    const startHandler = () => {
      // allow restart without showing prompt; keep seen flag so prompt never shows again
      setRun(false);
      setTimeout(() => startTour(true), 0);
    };
    window.addEventListener("start-emi-tour", startHandler as EventListener);

    const themeObserver = new MutationObserver(() => setDark(isDarkMode()));
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      window.removeEventListener(
        "start-emi-tour",
        startHandler as EventListener
      );
      themeObserver.disconnect();
    };
  }, [startTour, storageKey]);

  useEffect(() => {
    // Inject spotlight style for better dark mode visibility and WebView compatibility
    // WebViews have different rendering engines and often don't support modern CSS features
    // like backdrop-filter properly, causing blurred or distorted spotlight effects.
    // This fix provides optimized styles specifically for WebView environments.
    if (typeof document === "undefined") return;
    let styleTag = document.getElementById(
      "emi-tour-spotlight-style"
    ) as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "emi-tour-spotlight-style";
      document.head.appendChild(styleTag);
    }

    // Check if we're in a WebView environment
    const isWebView = isWebViewEnvironment();
    const hasBackdropFilter = supportsBackdropFilter();

    if (isWebView || !hasBackdropFilter) {
      // WebView-optimized styles: transparent background with strong outline for clear visibility
      styleTag.innerHTML = `
        .react-joyride__spotlight { 
          transition: box-shadow .25s ease, outline .25s ease, transform .25s ease; 
          outline: 4px solid rgba(99,102,241,1) !important; 
          box-shadow: 0 0 0 8px rgba(99,102,241,0.3), 0 0 20px rgba(99,102,241,0.4) !important; 
          background-color: transparent !important;
          border-radius: 8px;
          transform: scale(1.01);
        }
        .dark .react-joyride__spotlight { 
          outline: 4px solid rgba(129,140,248,1) !important; 
          box-shadow: 0 0 0 8px rgba(129,140,248,0.4), 0 0 20px rgba(129,140,248,0.5) !important; 
          background-color: transparent !important; 
          border-radius: 8px;
          transform: scale(1.01);
        }
      `;
    } else {
      // Standard browser styles with backdrop-filter
      styleTag.innerHTML = `
        .react-joyride__spotlight { 
          transition: box-shadow .25s ease, background-color .25s ease, outline .25s ease; 
          outline: 2px solid rgba(99,102,241,0.85); 
          box-shadow: 0 0 0 4px rgba(99,102,241,0.35), 0 4px 18px -2px rgba(0,0,0,0.45); 
          background-color: rgba(255,255,255,0.35);
          backdrop-filter: blur(2px) brightness(1.05);
        }
        .dark .react-joyride__spotlight { 
          outline: 2px solid rgba(129,140,248,0.95); 
          box-shadow: 0 0 0 4px rgba(129,140,248,0.55), 0 0 0 8px rgba(255,255,255,0.06), 0 4px 22px -2px rgba(0,0,0,0.75); 
          background-color: rgba(30,41,59,0.55); 
          backdrop-filter: blur(3px) brightness(1.2) saturate(1.1);
        }
      `;
    }
  }, [dark]);


  const scrollAdjustIntoView = useCallback(
    (selector: string | undefined, index?: number) => {
      if (!selector) return;
      if (index === 0) return; // prevent first step scroll
    },
    []
  );

  const callback = (data: CallBackProps) => {
    const { status, lifecycle, step, index } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      // Persist seen AFTER full tour or skip; ensures prompt never returns
      localStorage.setItem(storageKey, "1");
      // Emit postMessage event
      try {
        window.postMessage(
          {
            source: "emi-calculator",
            type:
              status === STATUS.FINISHED
                ? "emi-tour-finished"
                : "emi-tour-skipped",
          },
          "*"
        );
      } catch {}
    }
    if (lifecycle === "tooltip") {
      scrollAdjustIntoView(step?.target as string | undefined, index);
    }
  };

  if (!ready) return null;

  return (
    <>
      {showPrompt && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
          <div
            className={`relative max-w-[calc(100vw-1.5rem)] w-[540px] mx-auto rounded-2xl shadow-xl border ${
              dark
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            } p-6 animate-in fade-in zoom-in-95`}
          >
            <h2 className="text-lg font-semibold mb-2 bg-gradient-to-r from-indigo-600 via-violet-500 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-300 dark:to-pink-300">
              Interactive Tour
            </h2>
            <p className="text-sm leading-relaxed mb-5 text-slate-600 dark:text-slate-300">
              Take a quick guided tour to understand all calculator features:
              inputs, summaries, prepayments, EMI & rate changes, charts and
              schedule. You can always start it later using the{" "}
              <b>&quot;How to Use&quot;</b> button.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  // dismiss permanently without starting
                  localStorage.setItem(storageKey, "1");
                  setShowPrompt(false);
                  try {
                    window.postMessage(
                      { source: "emi-calculator", type: "emi-tour-dismissed" },
                      "*"
                    );
                  } catch {}
                }}
                className="px-4 py-2 text-xs font-medium rounded-md border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Maybe Later
              </button>
              <button
                type="button"
                onClick={() => startTour(false)}
                className="px-4 py-2 text-xs font-semibold rounded-md bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:from-indigo-500 dark:via-violet-500 dark:to-fuchsia-500"
              >
                Start Tour
              </button>
            </div>
          </div>
        </div>
      )}
      <Joyride
        run={run}
        steps={steps}
        continuous
        showSkipButton
        disableScrolling={false}
        scrollToFirstStep={false}
        scrollOffset={300}
        callback={callback}
        tooltipComponent={Tooltip}
        styles={{
          options: {
            zIndex: 10000,
            arrowColor: dark ? "#1e293b" : "#ffffff",
            backgroundColor: "transparent",
            primaryColor: "#6366f1",
            textColor: dark ? "#e2e8f0" : "#1e293b",
          },
          overlay: { 
            backgroundColor: isWebViewEnvironment() ? "rgba(0,0,0,0.85)" : "rgba(15,23,42,0.55)"
          },
          spotlight: {
            borderRadius: isWebViewEnvironment() ? 8 : 12,
            boxShadow: "none", // Let CSS handle this for better WebView compatibility
          },
        }}
        locale={{
          back: "Back",
          close: "Finish",
          last: "Finish",
          next: "Next",
          skip: "Skip",
        }}
        floaterProps={{ styles: { wrapper: { maxWidth: 360 } } }}
        spotlightPadding={6}
      />
    </>
  );
};

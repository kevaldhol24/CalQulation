import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Percent } from "lucide-react";
import { ReactNode, useState } from "react";
import { FaChevronRight, FaQuestion } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { TbMoneybag, TbTimeline } from "react-icons/tb";

type InfoDialogProps = {
  trigger: ReactNode;
};

export const AdvanceOptionsInfoDialog = ({ trigger }: InfoDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        onClose={() => setIsOpen(false)}
        className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto p-0 !rounded-xl"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-xl">
          <DialogHeader className="text-white">
            <DialogTitle className="text-2xl sm:text-3xl flex items-center gap-3 font-bold">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <TbTimeline className="text-white h-6 w-6" />
              </div>
              <span>Understanding Loan Changes</span>
            </DialogTitle>
            <DialogDescription className="text-blue-100 opacity-90 text-base">
              How to use different loan options and what happens when you make
              multiple changes
            </DialogDescription>
          </DialogHeader>
        </div>

        <Tabs defaultValue="overview" className="p-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-2 h-auto w-auto">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-1.5 py-2"
            >
              <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full">
                <IoMdInformationCircleOutline className="text-blue-600 dark:text-blue-400" />
              </div>
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="interest"
              className="flex items-center gap-1.5 py-2"
            >
              <div className="bg-amber-100 dark:bg-amber-900/50 p-1 rounded-full">
                <Percent className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              </div>
              <span>Interest</span>
            </TabsTrigger>
            <TabsTrigger value="emi" className="flex items-center gap-1.5 py-2">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-1 rounded-full">
                <CreditCard className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span>EMI</span>
            </TabsTrigger>
            <TabsTrigger
              value="prepayment"
              className="flex items-center gap-1.5 py-2"
            >
              <div className="bg-emerald-100 dark:bg-emerald-900/50 p-1 rounded-full">
                <TbMoneybag className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span>Prepayment</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
            className="mt-6 space-y-6 focus:outline-none"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm">
              <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-4">
                How Changes Work Together
              </h3>

              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  When you make changes to your loan in the same month, our
                  calculator follows a specific order to keep things consistent.
                  Think of it like a recipe where the order of ingredients
                  matters!
                </p>

                <div className="relative flex flex-col space-y-6 pl-10 md:pl-16 mt-8 md:mt-12">
                  {/* Timeline line */}
                  <div className="absolute left-4 md:left-3.5 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-blue-500 to-emerald-400"></div>

                  {/* Step 1 */}
                  <div className="relative">
                    <div className="absolute -left-10 md:-left-16 flex items-center justify-center">
                      <div
                        className="h-8 w-8 rounded-full bg-amber-100 dark:bg-[#3f2015] border-2 border-amber-400 flex items-center justify-center shadow-md"
                        style={{ animationDuration: "3s" }}
                      >
                        <span className="font-bold text-amber-600">1</span>
                      </div>
                    </div>
                    <div className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-sm border border-amber-200 dark:border-amber-800/50 hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-lg flex items-center text-amber-700 dark:text-amber-300">
                        <Percent className="h-5 w-5 mr-2" />
                        Interest Rate Changes
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        First up: any change to your interest rate. This happens
                        first since it affects how everything else works.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div className="absolute -left-10 md:-left-16 flex items-center justify-center">
                      <div
                        className="h-8 w-8 rounded-full bg-blue-100 dark:bg-[#121c3f] border-2 border-blue-500 flex items-center justify-center shadow-md"
                        style={{
                          animationDuration: "3s",
                          animationDelay: "1s",
                        }}
                      >
                        <span className="font-bold text-blue-600">2</span>
                      </div>
                    </div>
                    <div className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-sm border border-blue-200 dark:border-blue-800/50 hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-lg flex items-center text-blue-700 dark:text-blue-300">
                        <CreditCard className="h-5 w-5 mr-2" />
                        EMI Changes
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Next: your monthly payment adjustments. These changes
                        take the new interest rate into account.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div className="absolute -left-10 md:-left-16 flex items-center justify-center">
                      <div
                        className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-[#0a2128] border-2 border-emerald-500 flex items-center justify-center shadow-md"
                        style={{
                          animationDuration: "3s",
                          animationDelay: "2s",
                        }}
                      >
                        <span className="font-bold text-emerald-600">3</span>
                      </div>
                    </div>
                    <div className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-800/50 hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-lg flex items-center text-emerald-700 dark:text-emerald-300">
                        <TbMoneybag className="h-5 w-5 mr-2" />
                        Prepayments
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Finally: any extra money you put toward your loan. These
                        payments use the updated interest rate and EMI amount.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white dark:bg-gray-800/80 p-5 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full shrink-0">
                    <FaQuestion className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">
                    Let&apos;s see how this works with a real example
                  </h4>
                </div>
                <div className="mt-3 text-gray-700 dark:text-gray-300 space-y-3">
                  <p className="text-sm">
                    Say you have a home loan, and next month you want to:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                    <li className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md text-sm border border-amber-100 dark:border-amber-800/30 flex flex-col">
                      <span className="font-medium text-amber-700 dark:text-amber-300">
                        Lower your interest
                      </span>
                      <span>from 10% to 8.5%</span>
                    </li>
                    <li className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm border border-blue-100 dark:border-blue-800/30 flex flex-col">
                      <span className="font-medium text-blue-700 dark:text-blue-300">
                        Increase your EMI
                      </span>
                      <span>from ₹10,000 to ₹12,000</span>
                    </li>
                    <li className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-md text-sm border border-emerald-100 dark:border-emerald-800/30 flex flex-col">
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">
                        Make an extra payment
                      </span>
                      <span>of ₹50,000</span>
                    </li>
                  </ul>
                  <p className="text-sm mt-4">
                    Here&apos;s what happens behind the scenes:
                  </p>
                  <ol className="space-y-2 text-sm pl-4 list-decimal">
                    <li>First, your interest drops to 8.5%</li>
                    <li>Then your monthly payment goes up to ₹12,000</li>
                    <li>
                      Finally, your ₹50,000 extra payment reduces your loan
                      balance
                    </li>
                  </ol>
                  <p className="text-sm italic mt-2">
                    The result? You&apos;ll pay off your loan much faster and
                    save money on interest!
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interest" className="mt-6 focus:outline-none">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 rounded-xl border border-amber-200 dark:border-amber-800 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center border-2 border-white dark:border-amber-800 shadow-lg shrink-0 mx-auto sm:mx-0">
                  <Percent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-amber-700 dark:text-amber-300 text-center sm:text-left">
                    Interest Rate Changes
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center sm:text-left">
                    First in line when multiple changes happen
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-white/90 dark:bg-gray-800/90 p-5 rounded-xl border border-amber-200 dark:border-amber-800/50 shadow-sm">
                  <h4 className="font-medium text-amber-700 dark:text-amber-300 mb-3">
                    How Interest Changes Work
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    When your interest rate changes, it&apos;s like adjusting
                    the temperature of your oven before baking. It affects
                    everything that comes after it.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-3">
                    For example, if you drop your interest rate from 10% to 8%,
                    each monthly payment will cover more of your actual loan and
                    less will go to interest. That&apos;s good news!
                  </p>
                  <div className="flex items-center mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30">
                    <div className="mr-3 text-amber-500">
                      <FaChevronRight className="h-4 w-4" />
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Quick tip:</span> When
                      interest rates fall, consider keeping your EMI the same
                      instead of lowering it. You&apos;ll pay off your loan
                      faster!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/90 dark:bg-gray-800/90 p-5 rounded-xl border border-amber-200 dark:border-amber-800/50 shadow-sm">
                    <div className="flex items-center text-amber-700 dark:text-amber-300 mb-3">
                      <svg
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 12V3M12 3L9 6M12 3L15 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h4 className="font-medium">When rates go up</h4>
                    </div>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>
                          You&apos;ll need to pay more each month to stay on
                          schedule
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Your minimum EMI will increase</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>
                          Your loan might take longer to pay off if you
                          don&apos;t adjust your EMI
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/90 dark:bg-gray-800/90 p-5 rounded-xl border border-amber-200 dark:border-amber-800/50 shadow-sm">
                    <div className="flex items-center text-amber-700 dark:text-amber-300 mb-3">
                      <svg
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 16V7M12 16L9 13M12 16L15 13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h4 className="font-medium">When rates go down</h4>
                    </div>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>
                          You can pay the same amount and finish faster
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>
                          You could lower your EMI and keep the same end date
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>
                          More of each payment goes toward reducing your actual
                          loan
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="emi" className="mt-6 focus:outline-none">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-2 border-white dark:border-blue-800 shadow-lg shrink-0 mx-auto sm:mx-0">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 text-center sm:text-left">
                    EMI Changes
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center sm:text-left">
                    Second in line when multiple changes happen
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-white/90 dark:bg-gray-800/90 p-5 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-3">
                    Changing Your Monthly Payment
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Your EMI (Equated Monthly Installment) is the amount you pay
                    each month. Think of it like adjusting your monthly budget -
                    you can pay more or less depending on what works for you.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-3">
                    When you change your EMI, it applies right away to your next
                    payment. If you&apos;ve also changed your interest rate in
                    the same month, your new EMI will be based on that new rate.
                  </p>

                  <div className="flex items-center mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                    <div className="mr-3 text-blue-500">
                      <FaChevronRight className="h-4 w-4" />
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Important:</span>{" "}
                      There&apos;s always a minimum EMI amount that covers at
                      least the interest. You can&apos;t go below this number.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/90 dark:bg-gray-800/90 p-5 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <svg
                          className="h-5 w-5 text-blue-600 dark:text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          />
                        </svg>
                      </div>
                      <h4 className="font-medium text-blue-700 dark:text-blue-300">
                        Increasing Your EMI
                      </h4>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Paying more each month is like taking a shortcut to being
                      debt-free. You&apos;ll:
                    </p>
                    <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1.5">
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Finish your loan faster
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Pay less interest overall
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Build equity faster if it&apos;s a home loan
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/90 dark:bg-gray-800/90 p-5 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <svg
                          className="h-5 w-5 text-blue-600 dark:text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>
                      <h4 className="font-medium text-blue-700 dark:text-blue-300">
                        Decreasing Your EMI
                      </h4>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Lowering your monthly payment can help if money&apos;s
                      tight. Just remember:
                    </p>
                    <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1.5">
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-amber-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Your loan will take longer to pay off
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-amber-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        You&apos;ll pay more interest in total
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-amber-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        There&apos;s a minimum amount that you can&apos;t go
                        below
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prepayment" className="mt-6 focus:outline-none">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center border-2 border-white dark:border-emerald-800 shadow-lg shrink-0 mx-auto sm:mx-0">
                  <TbMoneybag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-emerald-700 dark:text-emerald-300 text-center sm:text-left">
                    Prepayments
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center sm:text-left">
                    Last in line when multiple changes happen
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-white/90 dark:bg-gray-800/90 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
                  <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-3">
                    Making Extra Payments
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Got some extra cash? Making a prepayment is like taking a
                    shortcut on your loan journey. Every rupee you prepay
                    directly reduces your loan balance.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-3">
                    Think of prepayments like paying your future self. For every
                    ₹10,000 you put in now, you might save ₹15,000 or more in
                    interest over time!
                  </p>

                  <div className="flex items-center mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                    <div className="mr-3 text-emerald-500">
                      <FaChevronRight className="h-4 w-4" />
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Smart move:</span> Whenever
                      you get a bonus, tax refund, or gift money, consider
                      putting some toward your loan.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800/50 shadow-sm transform transition-transform hover:-translate-y-1 hover:shadow-md">
                    <div className="flex flex-col items-center text-center p-4 mb-2">
                      <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 shadow-inner">
                        <svg
                          className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium text-emerald-700 dark:text-emerald-300">
                        Option 1: Reduce Tenure
                      </h4>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                      <p>
                        Keep paying the same amount each month, but finish your
                        loan sooner.
                      </p>
                      <p>
                        This is usually the better option if you want to save
                        the most money overall.
                      </p>
                      <p className="flex items-center mt-2">
                        <svg
                          className="h-5 w-5 mr-2 text-emerald-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Become debt-free faster
                      </p>
                      <p className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2 text-emerald-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Save maximum interest
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800/50 shadow-sm transform transition-transform hover:-translate-y-1 hover:shadow-md">
                    <div className="flex flex-col items-center text-center p-4 mb-2">
                      <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 shadow-inner">
                        <svg
                          className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium text-emerald-700 dark:text-emerald-300">
                        Option 2: Reduce EMI
                      </h4>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                      <p>
                        Lower your monthly payments while keeping the same loan
                        duration.
                      </p>
                      <p>
                        This is a good option if you want to free up some money
                        in your monthly budget.
                      </p>
                      <p className="flex items-center mt-2">
                        <svg
                          className="h-5 w-5 mr-2 text-emerald-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        More breathing room in your monthly budget
                      </p>
                      <p className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2 text-emerald-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Same end date for your loan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-b-xl flex justify-between items-center">
          <div className="text-white text-sm">
            Got a question about loan calculations? <a href="mailto:contact@calqulation.com" className="text-accent">contact@calqulation.com</a>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-white hover:bg-white/90 text-blue-700"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

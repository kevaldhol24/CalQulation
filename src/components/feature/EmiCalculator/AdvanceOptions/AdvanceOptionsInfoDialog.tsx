import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Percent } from "lucide-react";
import { TbMoneybag, TbTimeline } from "react-icons/tb";
import { FaQuestion, FaChevronRight } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { ReactNode, useState } from "react";

type InfoDialogProps = {
  trigger: ReactNode;
};

export const AdvanceOptionsInfoDialog = ({ trigger }: InfoDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent onClose={() => setIsOpen(false)} className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <TbTimeline className="text-primary" />
            <span>Understanding Multiple Loan Changes</span>
          </DialogTitle>
          <DialogDescription>
            Learn how multiple changes in the same month are handled in your loan calculation
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-1.5">
              <IoMdInformationCircleOutline />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="interest" className="flex items-center gap-1.5">
              <Percent className="h-3.5 w-3.5" />
              <span>Interest Changes</span>
            </TabsTrigger>
            <TabsTrigger value="emi" className="flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5" />
              <span>EMI Changes</span>
            </TabsTrigger>
            <TabsTrigger value="prepayment" className="flex items-center gap-1.5">
              <TbMoneybag className="h-3.5 w-3.5" />
              <span>Prepayments</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">How Changes are Applied</h3>
              
              <div className="mb-6">
                <p className="text-muted-foreground mb-3">
                  When multiple changes are applied to your loan in the same month, they are processed in a specific order to ensure consistent results:
                </p>
                
                <div className="flex items-center relative mb-2">
                  <div className="h-14 w-14 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center border border-amber-200 dark:border-amber-800">
                    <Percent className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="ml-4 pb-8 relative">
                    <h4 className="font-medium text-lg">1. Interest Rate Changes</h4>
                    <p className="text-sm text-muted-foreground">Applied first - affects all subsequent calculations</p>
                  </div>
                  <div className="absolute h-20 w-0.5 bg-gradient-to-b from-amber-200 to-blue-300 dark:from-amber-800 dark:to-blue-700 left-7 top-14 z-0"></div>
                </div>
                
                <div className="flex items-center relative mb-2">
                  <div className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                    <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4 pb-8 relative">
                    <h4 className="font-medium text-lg">2. EMI Changes</h4>
                    <p className="text-sm text-muted-foreground">Applied second - takes into account new interest rates</p>
                  </div>
                  <div className="absolute h-20 w-0.5 bg-gradient-to-b from-blue-300 to-emerald-200 dark:from-blue-700 dark:to-emerald-800 left-7 top-14 z-0"></div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                    <TbMoneybag className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-lg">3. Prepayments</h4>
                    <p className="text-sm text-muted-foreground">Applied last - impacts future installments based on updated EMI and interest</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-900/50 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                  <FaQuestion className="mr-2" /> 
                  Example Scenario
                </h4>
                <p className="text-sm mb-2">
                  If in January 2025, you&apos;ve scheduled:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1.5">
                  <li>An interest rate change from 10% to 8.5%</li>
                  <li>An EMI increase from ₹10,000 to ₹12,000</li>
                  <li>A one-time prepayment of ₹50,000</li>
                </ul>
                <div className="mt-3 text-sm">
                  <p><strong>Here&apos;s how it works:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1.5 mt-1">
                    <li>First, the interest rate changes to 8.5%</li>
                    <li>Then, using the new interest rate, your EMI is set to ₹12,000</li>
                    <li>Finally, after calculating your installment with the new rate and EMI, the prepayment of ₹50,000 is applied</li>
                  </ol>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="interest" className="mt-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center border border-amber-300 dark:border-amber-700 mr-3">
                  <Percent className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-amber-700 dark:text-amber-300">Interest Rate Changes</h3>
                  <p className="text-sm text-muted-foreground">Applied first in the order of operations</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/80 dark:bg-gray-900/50 p-4 rounded-md border border-amber-200 dark:border-amber-800">
                  <h4 className="font-medium mb-2">How It Works</h4>
                  <p className="text-sm">
                    Interest rate changes are applied before any other changes in the same month. This makes sense because the interest rate affects the core calculation of your loan installment.
                  </p>
                  <div className="flex items-center mt-4 py-2 px-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                    <div className="mr-3 text-amber-500">
                      <FaChevronRight />
                    </div>
                    <p className="text-xs">
                      <strong>Important:</strong> When you change your interest rate, all subsequent calculations for that month will use the new interest rate.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-900/50 p-4 rounded-md border border-amber-200 dark:border-amber-800">
                  <h4 className="font-medium mb-2">Impact on Other Changes</h4>
                  <p className="text-sm mb-3">
                    Since interest rate changes are applied first:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1.5">
                    <li>EMI changes will be calculated using the new interest rate</li>
                    <li>Prepayments will be applied after the interest rate has already been updated</li>
                    <li>The minimum EMI requirement may change based on your new interest rate</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="emi" className="mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center border border-blue-300 dark:border-blue-700 mr-3">
                  <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300">EMI Changes</h3>
                  <p className="text-sm text-muted-foreground">Applied second in the order of operations</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/80 dark:bg-gray-900/50 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium mb-2">How It Works</h4>
                  <p className="text-sm">
                    EMI changes are applied after interest rate changes but before any prepayments. This means your new EMI will reflect any interest rate changes made in the same month.
                  </p>
                  <div className="flex items-center mt-4 py-2 px-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <div className="mr-3 text-blue-500">
                      <FaChevronRight />
                    </div>
                    <p className="text-xs">
                      <strong>Remember:</strong> There is always a minimum EMI requirement based on your outstanding principal and interest rate. You cannot set an EMI below this minimum.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-900/50 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium mb-2">Impact on Loan Timeline</h4>
                  <p className="text-sm mb-3">
                    When you change your EMI:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1.5">
                    <li>Increasing your EMI will typically reduce your loan tenure</li>
                    <li>The new EMI is applied immediately in the current installment</li>
                    <li>Any prepayments in the same month will be applied after the EMI has been adjusted</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="prepayment" className="mt-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-6 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center border border-emerald-300 dark:border-emerald-700 mr-3">
                  <TbMoneybag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-emerald-700 dark:text-emerald-300">Prepayments</h3>
                  <p className="text-sm text-muted-foreground">Applied last in the order of operations</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/80 dark:bg-gray-900/50 p-4 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <h4 className="font-medium mb-2">How It Works</h4>
                  <p className="text-sm">
                    Prepayments are always applied last, after interest rate changes and EMI adjustments have been processed. The impact of prepayments will be noticed from the next installment onwards.
                  </p>
                  <div className="flex items-center mt-4 py-2 px-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-md">
                    <div className="mr-3 text-emerald-500">
                      <FaChevronRight />
                    </div>
                    <p className="text-xs">
                      <strong>Key Point:</strong> Prepayments directly reduce your principal balance. The effect (lower EMI or shorter tenure) depends on your chosen impact type.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-900/50 p-4 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <h4 className="font-medium mb-2">Impact Options</h4>
                  <p className="text-sm mb-2">
                    You can choose how prepayments affect your loan:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <div className="p-3 border border-emerald-100 dark:border-emerald-900 rounded-md bg-emerald-50/50 dark:bg-emerald-900/30">
                      <h5 className="font-medium text-sm mb-1">Reduce Tenure</h5>
                      <p className="text-xs text-muted-foreground">
                        Keep your EMI the same, but finish paying off your loan sooner
                      </p>
                    </div>
                    
                    <div className="p-3 border border-emerald-100 dark:border-emerald-900 rounded-md bg-emerald-50/50 dark:bg-emerald-900/30">
                      <h5 className="font-medium text-sm mb-1">Reduce EMI</h5>
                      <p className="text-xs text-muted-foreground">
                        Keep your tenure the same, but lower your monthly payment amount
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
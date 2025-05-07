import { MonthPicker } from "@/components/common/MonthPicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLoan } from "@/contexts/LoanContext";
import { formateDate } from "@/lib/utils";
import { EMIChange, isEMISufficient } from "loanwise";
import { CreditCard, Plus, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { AmountInput } from "../loanInputs/AmountInput";

export const EMIChangeDialog = () => {
  const { loanDetails, loanResults, updateLoanDetails } = useLoan();
  const [isOpen, setIsOpen] = useState(false);

  const minStartDate = useMemo(() => {
    return formateDate(
      loanResults?.schedule
        ? new Date(loanResults.schedule[0].year, loanResults.schedule[0].month)
        : new Date()
    );
  }, [loanResults?.schedule]);

  const [newEmiChange, setNewEmiChange] = useState<EMIChange>({
    id: uuid(),
    emi: 1000,
    startDate: formateDate(new Date()),
  });

  // Function to get the accurate EMI for the selected month
  const getSelectedMonthEMI = useMemo(() => {
    if (!loanResults?.schedule || !newEmiChange.startDate) return null;
    
    const selectedDate = new Date(newEmiChange.startDate);
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    console.log("asdd", {selectedMonth, selectedYear,ss: loanResults.schedule})

    // Find the matching entry in the loan schedule
    const scheduleEntry = loanResults.schedule.find(
      entry => entry.month - 1 === selectedMonth && entry.year === selectedYear
    );

    return scheduleEntry?.emiAmount || loanResults?.summary?.emi;
  }, [loanResults?.schedule, loanResults?.summary?.emi, newEmiChange.startDate]);

  useEffect(() => {
    setNewEmiChange((prev) => ({
      ...prev,
      startDate: minStartDate,
    }));
  }, [minStartDate]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        const currentEmi = loanResults?.summary?.emi || 1000;
        setNewEmiChange((prev) => ({
          ...prev,
          id: uuid(),
          emi: Math.round(currentEmi * 1.1), // Default to 10% higher than current EMI
          startDate: minStartDate,
        }));
      }, 1000);
    }
  }, [isOpen, minStartDate, loanResults?.summary?.emi]);

  const handleSubmit = () => {
    const emiChange = {
      ...newEmiChange,
      startDate: newEmiChange.startDate,
    };
    
    updateLoanDetails("emiChanges", [
      ...(loanDetails.emiChanges || []),
      emiChange,
    ]);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="border-dashed bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-800/20 transition-all group"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform duration-300" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[475px]"
        onClose={() => setIsOpen(false)}
      >
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="flex items-center">
              <CreditCard className="mr-2" size={18}/>
              New EMI Amount
            </DialogTitle>
            <DialogDescription className="mt-1">
              Adjust your EMI amount from a specific month.
            </DialogDescription>
          </div>
          <Button
            variant="ghost"
            className="p-1 h-6 w-6"
            onClick={() => setIsOpen(false)}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="grid gap-2">
          <div>
            <AmountInput
              hideSlider
              value={newEmiChange.emi}
              onChange={(value) =>
                setNewEmiChange((prev) => ({ ...prev, emi: value || 0 }))
              }
              minValue={100}
            />
            {getSelectedMonthEMI && (
              <p className="text-xs text-muted-foreground mt-1">
                Current EMI for selected month: {getSelectedMonthEMI.toLocaleString()} 
              </p>
            )}
          </div>
          
          <div>
            <MonthPicker
              label="Effective From"
              required
              minDate={new Date(minStartDate)}
              value={new Date(newEmiChange.startDate)}
              onChange={(value) => {
                setNewEmiChange((prev) => ({
                  ...prev,
                  startDate: formateDate(value || new Date()),
                }));
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
import { MonthPicker } from "@/components/common/MonthPicker";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { EMIChange } from "loanwise";
import { AlertTriangle, CreditCard, Plus, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { AmountInput } from "../loanInputs/AmountInput";

export const EMIChangeDialog = () => {
  const { loanDetails, loanResults, updateLoanDetails, getMinimumEMIForMonth } =
    useLoan();
  const [isOpen, setIsOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const minStartDate = useMemo(() => {
    return formateDate(
      loanResults?.schedule
        ? new Date(
            loanResults.schedule[0].year,
            loanResults.schedule[0].month + 1
          )
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

    // Find the matching entry in the loan schedule
    const scheduleEntry = loanResults.schedule.find(
      (entry) => entry.month === selectedMonth && entry.year === selectedYear
    );

    return scheduleEntry?.emiAmount || loanResults?.summary?.emi;
  }, [
    loanResults?.schedule,
    loanResults?.summary?.emi,
    newEmiChange.startDate,
  ]);

  // Get minimum required EMI for the selected month
  const minimumRequiredEMI = useMemo(() => {
    if (!newEmiChange.startDate) return 0;
    return getMinimumEMIForMonth(new Date(newEmiChange.startDate));
  }, [newEmiChange.startDate, getMinimumEMIForMonth]);

  // Validate EMI amount whenever it changes or date changes
  useEffect(() => {
    if (newEmiChange.emi < minimumRequiredEMI) {
      setValidationError(
        `EMI amount must be at least ${minimumRequiredEMI.toLocaleString()} for this month`
      );
    } else {
      setValidationError(null);
    }
  }, [newEmiChange.emi, minimumRequiredEMI]);

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
        setValidationError(null);
      }, 1000);
    }
  }, [isOpen, minStartDate, loanResults?.summary?.emi]);

  const handleSubmit = () => {
    // Prevent submission if validation error exists
    if (validationError) return;

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
              <CreditCard className="mr-2" size={18} />
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
        
        {validationError && (
          <Alert variant="destructive" className="mt-2 border-destructive/65">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-2">
          <div>
            <AmountInput
              hideSlider
              value={newEmiChange.emi}
              onChange={(value) =>
                setNewEmiChange((prev) => ({ ...prev, emi: value || 0 }))
              }
              minValue={1}
            />
            {getSelectedMonthEMI && (
              <p className="text-xs text-muted-foreground mt-1">
                Current EMI for selected month:{" "}
                {getSelectedMonthEMI.toLocaleString()}
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
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!!validationError}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

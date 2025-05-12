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
import { formateDate, formatMonthYear, isSameMonth } from "@/lib/utils";
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
    const startDate = loanResults?.schedule
      ? new Date(
          loanResults.schedule[0].year,
          loanResults.schedule[0].month + 1
        )
      : new Date();
    return formateDate(startDate);
  }, [loanResults?.schedule]);

  // Initialize with valid default values to prevent undefined/controlled switching
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

  // Check if the selected month already has an EMI change
  const hasConflictingEmiChange = useMemo(() => {
    if (!loanDetails.emiChanges || !newEmiChange.startDate) return false;

    return loanDetails.emiChanges.some((emiChange) =>
      isSameMonth(emiChange.startDate, newEmiChange.startDate)
    );
  }, [loanDetails.emiChanges, newEmiChange.startDate]);

  // Get minimum required EMI for the selected month
  const minimumRequiredEMI = useMemo(() => {
    if (!newEmiChange.startDate) return 0;
    return getMinimumEMIForMonth(new Date(newEmiChange.startDate));
  }, [newEmiChange.startDate, getMinimumEMIForMonth]);

  // Validate EMI amount and check for conflicts whenever values change
  useEffect(() => {
    if (hasConflictingEmiChange) {
      const selectedDate = new Date(newEmiChange.startDate);
      const month = selectedDate.toLocaleString("default", { month: "long" });
      const year = selectedDate.getFullYear();
      setValidationError(
        `An EMI change already exists for ${month} ${year}. Please select a different month.`
      );
    } else if (newEmiChange.emi < minimumRequiredEMI) {
      setValidationError(
        `EMI amount must be at least ${minimumRequiredEMI.toLocaleString()} for this month`
      );
    } else {
      setValidationError(null);
    }
  }, [
    newEmiChange.emi,
    minimumRequiredEMI,
    hasConflictingEmiChange,
    newEmiChange.startDate,
  ]);

  // Update start date when minStartDate changes
  useEffect(() => {
    if (minStartDate) {
      setNewEmiChange((prev) => ({
        ...prev,
        startDate: minStartDate,
      }));
    }
  }, [minStartDate]);

  // Reset form when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        const currentEmi = loanResults?.summary?.emi || 1000;
        setNewEmiChange({
          id: uuid(),
          emi: Math.round(currentEmi * 1.1), // Default to 10% higher than current EMI
          startDate: minStartDate || formateDate(new Date()), // Always ensure a valid date
        });
        setValidationError(null);
      }, 1000);
    }
  }, [isOpen, minStartDate, loanResults?.summary?.emi]);

  const handleSubmit = () => {
    // Check for conflicts again right before submission
    const isConflict = loanDetails.emiChanges?.some((emiChange) =>
      isSameMonth(emiChange.startDate, newEmiChange.startDate)
    );

    if (isConflict) {
      setValidationError(
        `An EMI change already exists for ${formatMonthYear(
          newEmiChange.startDate
        )}. Please select a different month.`
      );
      return;
    }

    // Check if EMI is below minimum required
    if (newEmiChange.emi < minimumRequiredEMI) {
      setValidationError(
        `EMI amount must be at least ${minimumRequiredEMI.toLocaleString()} for this month`
      );
      return;
    }

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
              minDate={new Date(minStartDate)} // Ensure we always pass a valid Date object
              value={new Date(newEmiChange.startDate)} // Ensure we always pass a valid Date object
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

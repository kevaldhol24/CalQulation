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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLoan } from "@/contexts/LoanContext";
import { formateDate, formatMonthYear, isSameMonth } from "@/lib/utils";
import { ImpactType, InterestRateChange } from "loanwise";
import { AlertTriangle, Percent, Plus, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { InterestInput } from "../loanInputs/InterestInput";

export const InterestRateChangeDialog = () => {
  const { loanDetails, loanResults, updateLoanDetails } = useLoan();
  const [isOpen, setIsOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const minStartDate = useMemo(() => {
    return formateDate(
      loanResults?.schedule
        ? new Date(loanResults.schedule[0].year, loanResults.schedule[0].month + 1)
        : new Date()
    );
  }, [loanResults?.schedule]);

  const [newRateChange, setNewRateChange] = useState<InterestRateChange>({
    id: uuid(),
    rate: 8.5,
    impact: ImpactType.Tenure,
    effectiveDate: formateDate(new Date()),
  });

  // Check if the selected month already has an interest rate change
  const hasConflictingInterestChange = useMemo(() => {
    if (!loanDetails.interestRateChanges || !newRateChange.effectiveDate) return false;
    
    return loanDetails.interestRateChanges.some(interestChange => 
      isSameMonth(interestChange.effectiveDate, newRateChange.effectiveDate)
    );
  }, [loanDetails.interestRateChanges, newRateChange.effectiveDate]);

  // Validate and check for conflicts whenever values change
  useEffect(() => {
    if (hasConflictingInterestChange) {
      setValidationError(
        `An interest rate change already exists for ${formatMonthYear(newRateChange.effectiveDate)}. Please select a different month.`
      );
    } else {
      setValidationError(null);
    }
  }, [hasConflictingInterestChange, newRateChange.effectiveDate]);

  useEffect(() => {
    setNewRateChange((prev) => ({
      ...prev,
      effectiveDate: minStartDate,
    }));
  }, [minStartDate]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setNewRateChange((prev) => ({
          ...prev,
          id: uuid(),
          rate: 8.5,
          impact: ImpactType.Tenure,
          effectiveDate: minStartDate,
        }));
        setValidationError(null);
      }, 1000);
    }
  }, [isOpen, minStartDate]);

  const handleSubmit = () => {
    // Check for conflicts again right before submission
    const isConflict = loanDetails.interestRateChanges?.some(interestChange => 
      isSameMonth(interestChange.effectiveDate, newRateChange.effectiveDate)
    );
    
    if (isConflict) {
      setValidationError(
        `An interest rate change already exists for ${formatMonthYear(newRateChange.effectiveDate)}. Please select a different month.`
      );
      return;
    }

    // Prevent submission if validation error exists
    if (validationError) return;

    const rateChange = {
      ...newRateChange,
      effectiveDate: newRateChange.effectiveDate,
    };

    updateLoanDetails("interestRateChanges", [
      ...(loanDetails.interestRateChanges || []),
      rateChange,
    ]);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="border-dashed bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-100/50 dark:hover:bg-amber-800/20 transition-all group"
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
              <Percent className="mr-2" size={18} />
              New Interest Rate
            </DialogTitle>
            <DialogDescription className="mt-1">
              Add interest rate changes for floating rate loans.
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
            <InterestInput
              hideSlider
              value={newRateChange.rate}
              onChange={(value) =>
                setNewRateChange((prev) => ({ ...prev, rate: value || 0 }))
              }
              minValue={0.1}
              maxValue={30}
            />
          </div>

          <div>
            <label className="text-sm">
              Impact <span className="text-destructive">*</span>
            </label>
            <Select
              value={newRateChange.impact}
              onValueChange={(value: ImpactType) =>
                setNewRateChange((prev) => ({ ...prev, impact: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an impact" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={ImpactType.Tenure}>
                    Tenure (Recommended)
                  </SelectItem>
                  <SelectItem value={ImpactType.EMI}>EMI</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <MonthPicker
              label="Effective From"
              required
              minDate={new Date(minStartDate)}
              value={new Date(newRateChange.effectiveDate)}
              onChange={(value) => {
                setNewRateChange((prev) => ({
                  ...prev,
                  effectiveDate: formateDate(value || new Date()),
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
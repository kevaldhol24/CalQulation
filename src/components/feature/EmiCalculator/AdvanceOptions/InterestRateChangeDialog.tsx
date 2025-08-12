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
  DialogTitle
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
import {
  formateDate,
  formatMonthYear,
  isInterestRateRealistic,
  isSameMonth,
} from "@/lib/utils";
import { ImpactType, InterestRateChange } from "~lib/calqulation";
import { AlertTriangle, Percent, XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { InterestInput } from "../../../common/InterestInput";
interface InterestChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export const InterestRateChangeDialog = ({
  isOpen,
  onClose,
}: InterestChangeDialogProps) => {
  const { loanDetails, loanResults, updateLoanDetails } = useLoan();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [realisticInterestError, setRealisticInterestError] = useState<
    string | null
  >(null);

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
  const [newRateChange, setNewRateChange] = useState<InterestRateChange>({
    id: uuid(),
    rate: 8.5,
    impact: ImpactType.Tenure,
    effectiveDate: formateDate(new Date()),
  });

  // Check if the selected month already has an interest rate change
  const hasConflictingInterestChange = useMemo(() => {
    if (!loanDetails.interestRateChanges || !newRateChange.effectiveDate)
      return false;

    return loanDetails.interestRateChanges.some((interestChange) =>
      isSameMonth(interestChange.effectiveDate, newRateChange.effectiveDate)
    );
  }, [loanDetails.interestRateChanges, newRateChange.effectiveDate]);

  // Validate and check for conflicts whenever values change
  useEffect(() => {
    if (hasConflictingInterestChange) {
      setValidationError(
        `An interest rate change already exists for ${formatMonthYear(
          newRateChange.effectiveDate
        )}. Please select a different month.`
      );
    } else {
      setValidationError(null);
    }
  }, [hasConflictingInterestChange, newRateChange.effectiveDate]);

  useEffect(() => {
    if (minStartDate) {
      setNewRateChange((prev) => ({
        ...prev,
        effectiveDate: minStartDate,
      }));
    }
  }, [minStartDate]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setNewRateChange({
          id: uuid(),
          rate: 8.5,
          impact: ImpactType.Tenure,
          effectiveDate: minStartDate || formateDate(new Date()), // Always ensure a valid date string
        });
        setValidationError(null);
      }, 1000);
    }
  }, [isOpen, minStartDate]);

  const handleSubmit = () => {
    // Check for conflicts again right before submission
    const isConflict = loanDetails.interestRateChanges?.some((interestChange) =>
      isSameMonth(interestChange.effectiveDate, newRateChange.effectiveDate)
    );

    if (isConflict) {
      setValidationError(
        `An interest rate change already exists for ${formatMonthYear(
          newRateChange.effectiveDate
        )}. Please select a different month.`
      );
      return;
    }

    if (!hasRealisticInterest()) {
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

    onClose();
  };

  const hasRealisticInterest = useCallback(() => {
    if (!loanDetails.interestRateChanges || !newRateChange.effectiveDate)
      return false;

    // Only check for realistic interest rate when impact is Tenure
    // When impact is EMI, the EMI amount will be adjusted accordingly
    if (newRateChange.impact === ImpactType.EMI) {
      setRealisticInterestError(null);
      return true;
    }

    const { emiAmount, remainingBalance } = loanResults?.schedule.find(
      (item) => {
        return item.date === newRateChange.effectiveDate;
      }
    ) || { emiAmount: 0, remainingBalance: 0 };

    const isRealistic = isInterestRateRealistic(
      remainingBalance,
      emiAmount,
      newRateChange.rate
    );
    if (!isRealistic) {
      setRealisticInterestError(
        "The newly proposed interest rate is not sustainable, as it would result in the loan never being fully repaid. To proceed with this rate, the EMI amount must be increased accordingly to ensure the loan is paid off within a reasonable timeframe."
      );
    } else {
      setRealisticInterestError(null);
    }
    return isRealistic;
  }, [
    loanDetails.interestRateChanges,
    loanResults?.schedule,
    newRateChange.effectiveDate,
    newRateChange.rate,
    newRateChange.impact,
  ]);

  useEffect(() => {
    hasRealisticInterest();
  }, [hasRealisticInterest]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[475px]">
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
            onClick={onClose}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        {(validationError || realisticInterestError) && (
          <Alert variant="destructive" className="mt-2 border-destructive/65">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {validationError || realisticInterestError}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-2">
          <div>
            <InterestInput
              label="New Interest Rate"
              id="interest-rate"
              title="Enter the new interest rate in percentage"
              placeholder="Enter interest rate"
              name="interestRate"
              required
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
              minDate={new Date(minStartDate || Date.now())} // Ensure we always have a valid Date object
              value={new Date(newRateChange.effectiveDate)} // Ensure we always have a valid Date object
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
            <Button variant="outline" onClick={onClose}>
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

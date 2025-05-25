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
import { ImpactType, Prepayment, PrepaymentFrequency } from "loanwise";
import { AlertTriangle, Plus, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { TbMoneybag } from "react-icons/tb";
import { v4 as uuid } from "uuid";
import { AmountInput } from "../loanInputs/AmountInput";

export const PrepaymentDialog = () => {
  const { loanDetails, loanResults, updateLoanDetails } = useLoan();
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

  // Initialize with default date instead of allowing undefined
  const [newPrepayment, setNewPrepayment] = useState<Prepayment>({
    id: uuid(),
    amount: 10000,
    type: PrepaymentFrequency.Onetime,
    impact: ImpactType.Tenure,
    startDate: formateDate(new Date()),
    endDate: undefined, // Initialize with a valid date
  });

  // Check if the selected month already has a prepayment
  const hasConflictingPrepayment = useMemo(() => {
    if (!loanDetails.prepayments || !newPrepayment.startDate) return false;

    return loanDetails.prepayments.some((prepayment) =>
      isSameMonth(prepayment.startDate, newPrepayment.startDate)
    );
  }, [loanDetails.prepayments, newPrepayment.startDate]);

  // Validate and check for conflicts whenever values change
  useEffect(() => {
    if (!validationError) return;
    if (hasConflictingPrepayment) {
      setValidationError(
        `A prepayment already exists for ${formatMonthYear(
          newPrepayment.startDate
        )}. Please select a different month.`
      );
    } else {
      setValidationError(null);
    }
  }, [hasConflictingPrepayment, newPrepayment.startDate, validationError]);

  useEffect(() => {
    setNewPrepayment((prev) => ({
      ...prev,
      startDate: minStartDate,
    }));
  }, [minStartDate]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        // Always use defined values for all fields
        setNewPrepayment({
          id: uuid(),
          amount: 10000,
          type: PrepaymentFrequency.Onetime,
          impact: ImpactType.Tenure,
          startDate: minStartDate,
          endDate: undefined, // Always initialize with a valid date
        });
        setValidationError(null);
      }, 1000);
    }
  }, [isOpen, minStartDate]);

  const handleSubmit = () => {
    // Check for conflicts again right before submission
    const isConflict = loanDetails.prepayments?.some((prepayment) =>
      isSameMonth(prepayment.startDate, newPrepayment.startDate)
    );

    if (isConflict) {
      setValidationError(
        `A prepayment already exists for ${formatMonthYear(
          newPrepayment.startDate
        )}. Please select a different month.`
      );
      return;
    }

    // Prevent submission if validation error exists
    if (validationError) return;

    const prepayment = {
      ...newPrepayment,
      startDate: newPrepayment.startDate,
      // Only include endDate for monthly prepayments
      endDate:
        newPrepayment.type === PrepaymentFrequency.Monthly
          ? newPrepayment.endDate
          : undefined,
    };
    updateLoanDetails("prepayments", [
      ...(loanDetails.prepayments || []),
      prepayment,
    ]);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="border-dashed bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/20 transition-all group"
          aria-label="Add new prepayment"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[475px]"
      >
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="flex items-center">
              <TbMoneybag className="mr-2" aria-hidden="true" />
              New Prepayment
            </DialogTitle>
            <DialogDescription className="mt-1">
              Prepayments help you pay off your loan faster.
            </DialogDescription>
          </div>
          <Button
            variant="ghost"
            className="p-1 h-6 w-6"
            onClick={() => setIsOpen(false)}
            aria-label="Close dialog"
          >
            <XIcon aria-hidden="true" />
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
          <AmountInput
            hideSlider
            value={newPrepayment.amount || undefined}
            onChange={(value) =>
              setNewPrepayment((prev) => ({ ...prev, amount: value || 0 }))
            }
            maxValue={loanDetails.loanAmount}
            minValue={10}
          />

          <div className="grid  grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              
              <label className="text-sm" id="prepayment-type-label">
                Type <span className="text-destructive">*</span>
              </label>
              <Select
                value={newPrepayment.type}
                onValueChange={(value: PrepaymentFrequency) =>
                  setNewPrepayment((prev) => ({ ...prev, type: value }))
                }
                aria-labelledby="prepayment-type-label"
              >
                <SelectTrigger
                  className="w-full"
                  aria-label="Select prepayment type"
                >
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={PrepaymentFrequency.Onetime}>
                      Onetime
                    </SelectItem>
                    <SelectItem value={PrepaymentFrequency.Monthly}>
                      Monthly recurring
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm">
                Impact <span className="text-destructive">*</span>
              </label>
              <Select
                value={newPrepayment.impact}
                onValueChange={(value: ImpactType) =>
                  setNewPrepayment((prev) => ({ ...prev, impact: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a impact" />
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
          </div>
          <div
            className={`grid grid-cols-1 gap-2 ${
              newPrepayment.type === PrepaymentFrequency.Monthly
                ? "sm:grid-cols-2"
                : ""
            }`}
          >
            
            <MonthPicker
              label="Start Month"
              required
              minDate={new Date(minStartDate)}
              value={new Date(newPrepayment.startDate)}
              onChange={(value) => {
                setNewPrepayment((prev) => ({
                  ...prev,
                  startDate: formateDate(value || new Date()),
                }));
              }}
            />
            {newPrepayment.type === PrepaymentFrequency.Monthly && (
              <MonthPicker
                label="End Month"
                minDate={new Date(newPrepayment.startDate)}
                value={
                  newPrepayment.endDate
                    ? new Date(newPrepayment.endDate)
                    : undefined
                } // Always provide a valid Date object
                placeholder="Select month"
                onChange={(value) => {
                  setNewPrepayment((prev) => ({
                    ...prev,
                    endDate: formateDate(value || new Date()),
                  }));
                }}
              />
            )}
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
            aria-label="Add prepayment"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

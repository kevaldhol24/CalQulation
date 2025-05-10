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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLoan } from "@/contexts/LoanContext";
import { formateDate } from "@/lib/utils";
import { ImpactType, Prepayment, PrepaymentFrequency } from "loanwise";
import { Plus, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { TbMoneybag } from "react-icons/tb";
import { v4 as uuid } from "uuid";
import { AmountInput } from "../loanInputs/AmountInput";

export const PrepaymentDialog = () => {
  const { loanDetails, loanResults, updateLoanDetails } = useLoan();
  const [isOpen, setIsOpen] = useState(false);

  const minStartDate = useMemo(() => {
    return formateDate(
      loanResults?.schedule
        ? new Date(loanResults.schedule[0].year, loanResults.schedule[0].month + 1)
        : new Date()
    );
  }, [loanResults?.schedule]);

  const [newPrepayment, setNewPrepayment] = useState<Prepayment>({
    id: uuid(),
    amount: 10000,
    type: PrepaymentFrequency.Onetime,
    impact: ImpactType.Tenure,
    startDate: formateDate(new Date()),
    endDate: undefined,
  });

  useEffect(() => {
    setNewPrepayment((prev) => ({
      ...prev,
      startDate: minStartDate,
    }));
  }, [minStartDate]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setNewPrepayment((prev) => ({
          ...prev,
          id: uuid(),
          amount: 10000,
          type: PrepaymentFrequency.Onetime,
          impact: ImpactType.Tenure,
          startDate: minStartDate,
          endDate: undefined,
        }));
      }, 1000);
    }
  }, [isOpen, minStartDate]);

  const handleSubmit = () => {
    const prepayment = {
      ...newPrepayment,
      startDate: newPrepayment.startDate,
      endDate:
        newPrepayment.type === PrepaymentFrequency.Onetime ||
        !newPrepayment.endDate
          ? undefined
          : newPrepayment.endDate,
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
        >
          <Plus className="size-4" />
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
              <TbMoneybag className="mr-2" />
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
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
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
              <label className="text-sm">
                Type <span className="text-destructive">*</span>
              </label>
              <Select
                value={newPrepayment.type}
                onValueChange={(value: PrepaymentFrequency) =>
                  setNewPrepayment((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger className="w-full">
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
                }
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
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { createSharedCalculation } from "@/actions/sharedCalculationActions";
import { Button } from "@/components/ui/button";
import { useLoan } from "@/contexts/LoanContext";
import { useState } from "react";
import { FaShare } from "react-icons/fa";
import { toast } from "sonner";

export function ShareButton() {
  const { loanDetails } = useLoan();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);

    try {
      const result = await createSharedCalculation(loanDetails);

      if (result.success && result.id) {
        // Create the shareable URL
        const shareUrl = `${window.location.origin}${window.location.pathname}?share=${result.id}`;

        // Copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        await navigator.share({
          title: "Check out this loan calculation",
          url: shareUrl,
        });
        toast.success("Link copied to clipboard! only valid for 24 hours.");
      } else {
        toast.error("Failed to create shareable link. please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      toast.error("An error occurred while sharing the calculation.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleShare}
      disabled={isSharing}
    >
      <FaShare size={14} />
      {isSharing ? "Creating link..." : "Share calculation"}
    </Button>
  );
}

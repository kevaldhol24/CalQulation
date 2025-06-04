"use client";

import { Button } from "@/components/ui/button";
import { useLoan } from "@/contexts/LoanContext";
import { exportToExcel } from "@/utils/excelDownloader";
import { useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { toast } from "sonner";

export function DownloadButton() {
  const { loanResults, loanDetails } = useLoan();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (!loanResults) {
        toast.error("No calculation data available to download");
        return;
      }

      const result = await exportToExcel(loanResults, loanDetails);
      
      if (result.success) {
        toast.success(`Calculation exported to ${result.fileName}`);
      } else {
        toast.error("Failed to export calculation to Excel");
      }
    } catch (error) {
      console.error("Error downloading Excel file:", error);
      toast.error("An error occurred while downloading the calculation");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleDownload}
      disabled={isDownloading || !loanResults}
    >
      <FaFileExcel size={14} />
      {isDownloading ? "Downloading..." : "Download Excel"}
    </Button>
  );
}

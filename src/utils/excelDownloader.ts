"use client";

import { LoanCalculationInputs, LoanCalculationOutput } from "~lib/calqulation";
import * as XLSX from 'xlsx-js-style';
import moment from 'moment';

export const exportToExcel = async (loanData: LoanCalculationOutput, loanDetails: LoanCalculationInputs) => {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Define colors for Excel styling
    const COLORS = {
      PRIMARY: "4361EE",      // Blue
      SECONDARY: "7209B7",    // Purple
      LIGHT_BG: "F8F9FA",     // Light background
      DARK_BG: "343A40",      // Dark background
      WHITE: "FFFFFF",        // White
      LIGHT_GRAY: "E9ECEF",   // Light gray
      MEDIUM_GRAY: "CED4DA",  // Medium gray
      ALT_ROW: "F5F5F5",      // Alternate row color
      RED: "FF0000"           // For warnings
    };

    // Add workbook properties for branding
    workbook.Props = {
      Title: "Loan Calculation Report",
      Subject: "Loan Amortization and Payment Schedule",
      Author: "CalQulation",
      Company: "CalQulation",
      CreatedDate: new Date()
    };

    // Create summary sheet
    const summaryData = [
      ['CalQulation - Loan Summary Report'],
      ['Generated on: ' + moment().format('MMMM D, YYYY [at] h:mm A')],
      [''],
      ['Loan Summary'],
      [''],
      ['EMI', loanData.summary.emi],
      ['Loan Amount', loanData.summary.loanAmount],
      ['Total Interest Payable', loanData.summary.totalInterestPayable],
      ['Total Amount Payable', loanData.summary.totalAmountPayable],
      ['Total Prepayment', loanData.summary.totalPrepayment],
      ['Last Payment Date', moment(loanData.summary.lastPaymentDate).format('MMMM YYYY')],
      [''],
      ['Loan Details'],
      [''],
      ['Initial Interest Rate (%)', loanDetails.initialInterestRate],
      ['Tenure (Months)', loanDetails.tenureMonths],
      ['Start Date', moment(loanDetails.startDate).format('MMMM YYYY')],
      [''],
      ['© CalQulation - This report is for informational purposes only']
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);

    // Apply styling to the summary sheet
    // Title styling with merged cells
    summarySheet['A1'] = {
      v: 'CalQulation - Loan Summary Report',
      t: 's',
      s: {
        font: { bold: true, color: { rgb: COLORS.WHITE }, size: 16 },
        fill: { fgColor: { rgb: COLORS.SECONDARY } },
        alignment: { horizontal: "center", vertical: "center" }
      }
    };

    // Date styling
    summarySheet['A2'] = {
      v: 'Generated on: ' + moment().format('MMMM D, YYYY [at] h:mm A'),
      t: 's',
      s: {
        font: { italic: true, color: { rgb: COLORS.DARK_BG } },
        alignment: { horizontal: "left" }
      }
    };

    // Section headers
    summarySheet['A4'] = {
      v: 'Loan Summary',
      t: 's',
      s: {
        font: { bold: true, color: { rgb: COLORS.PRIMARY }, size: 14 },
        alignment: { horizontal: "left" },
        border: { bottom: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } } }
      }
    };

    summarySheet['A13'] = {
      v: 'Loan Details',
      t: 's',
      s: {
        font: { bold: true, color: { rgb: COLORS.PRIMARY }, size: 14 },
        alignment: { horizontal: "left" },
        border: { bottom: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } } }
      }
    };

    // Apply styling to the data rows
    const applyDataRowStyle = (row: number, key: string, value: string | number) => {
      // Key cell (Column A)
      summarySheet[`A${row}`] = {
        v: key,
        t: 's',
        s: {
          font: { bold: true },
          alignment: { horizontal: "left" }
        }
      };

      // Value cell (Column B)
      summarySheet[`B${row}`] = {
        v: value,
        t: typeof value === 'number' ? 'n' : 's',
        s: {
          font: { color: { rgb: COLORS.DARK_BG } },
          alignment: { horizontal: "right" },
          numFmt: typeof value === 'number' ? "#,##0.00" : "@"
        }
      };
    };

    // Apply styles to data rows
    applyDataRowStyle(6, 'EMI', loanData.summary.emi);
    applyDataRowStyle(7, 'Loan Amount', loanData.summary.loanAmount);
    applyDataRowStyle(8, 'Total Interest Payable', loanData.summary.totalInterestPayable);
    applyDataRowStyle(9, 'Total Amount Payable', loanData.summary.totalAmountPayable);
    applyDataRowStyle(10, 'Total Prepayment', loanData.summary.totalPrepayment);
    applyDataRowStyle(11, 'Last Payment Date', moment(loanData.summary.lastPaymentDate).format('MMMM YYYY'));

    applyDataRowStyle(15, 'Initial Interest Rate (%)', loanDetails.initialInterestRate);
    applyDataRowStyle(16, 'Tenure (Months)', loanDetails.tenureMonths);
    applyDataRowStyle(17, 'Start Date', moment(loanDetails.startDate).format('MMMM YYYY'));

    // Copyright notice
    summarySheet['A19'] = {
      v: '© CalQulation - This report is for informational purposes only',
      t: 's',
      s: {
        font: { italic: true, size: 10, color: { rgb: "777777" } },
        alignment: { horizontal: "left" }
      }
    };

    summarySheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
      { s: { r: 19, c: 0 }, e: { r: 19, c: 1 } }
    ];

    // Set column widths for better readability
    summarySheet['!cols'] = [{ wch: 25 }, { wch: 15 }];

    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    // Create repayment schedule sheet
    const scheduleHeaders = [
      'Payment Date',
      'EMI Number',
      'EMI Amount',
      'Interest Paid',
      'Principal Paid',
      'Prepayment',
      'Total Monthly Payment',
      'Principal Paid Till Date',
      'Remaining Balance',
      'Interest Rate (%)'
    ];

    const scheduleData = loanData.schedule.map(item => [
      moment(new Date(item.year, item.month, 1)).format('MMMM YYYY'),
      item.emiNumber,
      item.emiAmount,
      item.interestPaid,
      item.principalPaid,
      item.prepayment || 0,
      item.totalMonthlyPayment,
      item.principalPaidTillDate,
      item.remainingBalance,
      item.interestRate
    ]);

    // Add headers to schedule data
    scheduleData.unshift(scheduleHeaders);

    const scheduleSheet = XLSX.utils.aoa_to_sheet(scheduleData);

    // Apply header styling
    const headerStyle = {
      font: { bold: true, color: { rgb: COLORS.WHITE }, size: 12 },
      fill: { fgColor: { rgb: COLORS.PRIMARY } },
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
        bottom: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
        left: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
        right: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } }
      }
    };

    // Apply styles to header row
    for (let i = 0; i < scheduleHeaders.length; i++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
      if (scheduleSheet[cellRef]) {
        scheduleSheet[cellRef].s = headerStyle;
      }
    }

    // Apply alternating row styles and data formatting
    for (let i = 1; i < scheduleData.length; i++) {
      const rowStyle = {
        fill: i % 2 === 0 ? { fgColor: { rgb: COLORS.ALT_ROW } } : null
      };

      for (let j = 0; j < scheduleData[i].length; j++) {
        const cellRef = XLSX.utils.encode_cell({ r: i, c: j });
        if (scheduleSheet[cellRef]) {
          // Apply cell-specific styling based on column type
          if (j === 0) { // Date column
            scheduleSheet[cellRef].s = {
              ...rowStyle,
              alignment: { horizontal: "center" }
            };
          } else if (j === 1) { // EMI Number column
            scheduleSheet[cellRef].s = {
              ...rowStyle,
              alignment: { horizontal: "center" }
            };
          } else if (j === 9) { // Interest Rate column
            scheduleSheet[cellRef].s = {
              ...rowStyle,
              alignment: { horizontal: "center" },
              numFmt: "0.00%"
            };
          } else { // Amount columns
            scheduleSheet[cellRef].s = {
              ...rowStyle,
              alignment: { horizontal: "right" },
              numFmt: "#,##0.00"
            };
          }
        }
      }
    }

    // Set column widths for schedule sheet
    scheduleSheet['!cols'] = [
      { wch: 15 }, // Date
      { wch: 8 },  // EMI Number
      { wch: 12 }, // EMI Amount
      { wch: 12 }, // Interest Paid
      { wch: 12 }, // Principal Paid
      { wch: 12 }, // Prepayment
      { wch: 12 }, // Total Monthly Payment
      { wch: 12 }, // Principal Paid Till Date
      { wch: 12 }, // Remaining Balance
      { wch: 10 }  // Interest Rate
    ];

    XLSX.utils.book_append_sheet(workbook, scheduleSheet, 'Repayment Schedule');

    // Add advanced data sheets with similar styling pattern
    if (loanDetails.prepayments && loanDetails.prepayments.length > 0) {
      const prepaymentData = [
        ['Prepayments - CalQulation'],
        ['Generated on: ' + moment().format('MMMM D, YYYY')],
        [''],
        ['Type', 'Amount', 'Start Date', 'End Date (if applicable)']
      ];

      loanDetails.prepayments.forEach((prepayment) => {
        prepaymentData.push([
          String(prepayment.type),
          String(prepayment.amount),
          moment(prepayment.startDate).format('MMMM YYYY'),
          prepayment.endDate ? moment(prepayment.endDate).format('MMMM YYYY') : 'N/A'
        ]);
      });

      const prepaymentSheet = XLSX.utils.aoa_to_sheet(prepaymentData);

      // Style title
      prepaymentSheet['A1'] = {
        v: 'Prepayments - CalQulation',
        t: 's',
        s: {
          font: { bold: true, color: { rgb: COLORS.WHITE }, size: 16 },
          fill: { fgColor: { rgb: COLORS.SECONDARY } },
          alignment: { horizontal: "center", vertical: "center" }
        }
      };

      // Style headers
      const headerRow = ['A4', 'B4', 'C4', 'D4'];
      headerRow.forEach(cellRef => {
        if (prepaymentSheet[cellRef]) {
          prepaymentSheet[cellRef].s = {
            font: { bold: true, color: { rgb: COLORS.WHITE } },
            fill: { fgColor: { rgb: COLORS.PRIMARY } },
            alignment: { horizontal: "center" },
            border: {
              top: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
              bottom: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
              left: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
              right: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } }
            }
          };
        }
      });

      prepaymentSheet['!cols'] = [{ wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 15 }];
      prepaymentSheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
      XLSX.utils.book_append_sheet(workbook, prepaymentSheet, 'Prepayments');
    }

    if (loanDetails.interestRateChanges && loanDetails.interestRateChanges.length > 0) {
      const interestData = [
        ['Interest Rate Changes - CalQulation'],
        ['Generated on: ' + moment().format('MMMM D, YYYY')],
        [''],
        ['New Rate (%)', 'Effective Date']
      ];

      loanDetails.interestRateChanges.forEach((change) => {
        interestData.push([
          String(change.rate),
          moment(change.effectiveDate).format('MMMM YYYY')
        ]);
      });

      const interestSheet = XLSX.utils.aoa_to_sheet(interestData);

      // Style title
      interestSheet['A1'] = {
        v: 'Interest Rate Changes - CalQulation',
        t: 's',
        s: {
          font: { bold: true, color: { rgb: COLORS.WHITE }, size: 16 },
          fill: { fgColor: { rgb: COLORS.SECONDARY } },
          alignment: { horizontal: "center", vertical: "center" }
        }
      };

      // Style headers
      ['A4', 'B4'].forEach(cellRef => {
        if (interestSheet[cellRef]) {
          interestSheet[cellRef].s = {
            font: { bold: true, color: { rgb: COLORS.WHITE } },
            fill: { fgColor: { rgb: COLORS.PRIMARY } },
            alignment: { horizontal: "center" },
            border: {
              top: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
              bottom: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
              left: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
              right: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } }
            }
          };
        }
      });

      interestSheet['!cols'] = [{ wch: 12 }, { wch: 15 }];
      interestSheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];
      XLSX.utils.book_append_sheet(workbook, interestSheet, 'Interest Rate Changes');
    }

    if (loanDetails.emiChanges && loanDetails.emiChanges.length > 0) {
      const emiChangeData = [
        ['EMI Changes - CalQulation'],
        ['Generated on: ' + moment().format('MMMM D, YYYY')],
        [''],
        ['New EMI', 'Start Date']
      ];

      loanDetails.emiChanges.forEach((change) => {
        emiChangeData.push([
          String(change.emi),
          moment(change.startDate).format('MMMM YYYY')
        ]);
      });

      const emiChangeSheet = XLSX.utils.aoa_to_sheet(emiChangeData);

      // Style title
      emiChangeSheet['A1'] = {
        v: 'EMI Changes - CalQulation',
        t: 's',
        s: {
          font: { bold: true, color: { rgb: COLORS.WHITE }, size: 16 },
          fill: { fgColor: { rgb: COLORS.SECONDARY } },
          alignment: { horizontal: "center", vertical: "center" }
        }
      };

      // Style headers
      ['A4', 'B4'].forEach(cellRef => {
        if (emiChangeSheet[cellRef]) {
          emiChangeSheet[cellRef].s = {
            font: { bold: true, color: { rgb: COLORS.WHITE } },
            fill: { fgColor: { rgb: COLORS.PRIMARY } },
            alignment: { horizontal: "center" },
            border: {
              top: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
              bottom: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
              left: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } },
              right: { style: "thin", color: { rgb: COLORS.LIGHT_GRAY } }
            }
          };
        }
      });

      emiChangeSheet['!cols'] = [{ wch: 12 }, { wch: 15 }];
      emiChangeSheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];
      XLSX.utils.book_append_sheet(workbook, emiChangeSheet, 'EMI Changes');
    }

    // Add a branding sheet with disclaimer
    const brandingData = [
      ['CalQulation - Loan Calculation Tool'],
      [''],
      ['Report generated on: ' + moment().format('MMMM D, YYYY [at] h:mm A')],
      [''],
      ['Disclaimer:'],
      ['This report is provided for informational purposes only and does not constitute financial advice.'],
      ['The calculations provided are based on the inputs provided and assumptions made.'],
      ['Actual loan terms may vary. Please consult with a financial advisor before making any financial decisions.'],
      [''],
      ['© ' + new Date().getFullYear() + ' CalQulation. All rights reserved.'],
      ['Contact: info@calqulation.com'],
      [''],
      ['This document is protected and should not be modified.']
    ];

    const brandingSheet = XLSX.utils.aoa_to_sheet(brandingData);

    // Style title
    brandingSheet['A1'] = {
      v: 'CalQulation - Loan Calculation Tool',
      t: 's',
      s: {
        font: { bold: true, color: { rgb: COLORS.WHITE }, size: 18 },
        fill: { fgColor: { rgb: COLORS.SECONDARY } },
        alignment: { horizontal: "center", vertical: "center" }
      }
    };

    // Style date
    brandingSheet['A3'] = {
      v: 'Report generated on: ' + moment().format('MMMM D, YYYY [at] h:mm A'),
      t: 's',
      s: {
        font: { italic: true },
        alignment: { horizontal: "left" }
      }
    };

    // Style disclaimer heading
    brandingSheet['A5'] = {
      v: 'Disclaimer:',
      t: 's',
      s: {
        font: { bold: true, size: 12, color: { rgb: COLORS.PRIMARY } },
        alignment: { horizontal: "left" }
      }
    };

    // Style copyright
    brandingSheet['A10'] = {
      v: '© ' + new Date().getFullYear() + ' CalQulation. All rights reserved.',
      t: 's',
      s: {
        font: { bold: true, size: 11 },
        alignment: { horizontal: "left" }
      }
    };

    // Style warning
    brandingSheet['A13'] = {
      v: 'This document is protected and should not be modified.',
      t: 's',
      s: {
        font: { bold: true, color: { rgb: COLORS.RED } },
        alignment: { horizontal: "left" }
      }
    };

    brandingSheet['!cols'] = [{ wch: 100 }]; // Wide column for disclaimer text
    brandingSheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }];
    XLSX.utils.book_append_sheet(workbook, brandingSheet, 'About');

    // Generate Excel file
    const fileName = `Loan_Calculation_${new Date().toISOString().slice(0, 10)}.xlsx`;

    // Add workbook structure
    if (!workbook.Workbook) workbook.Workbook = {};

    // Add file protection settings
    workbook.Workbook.Views = [{ RTL: false }];

    // Apply sheet protection to all sheets
    // Note: Basic protection is used here, which is not highly secure
    // but will prevent casual users from editing
    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      sheet['!protect'] = {
        password: 'calqulation',
        formatCells: false,
        formatColumns: false,
        formatRows: false,
        insertColumns: false,
        insertRows: false,
        insertHyperlinks: false,
        deleteColumns: false,
        deleteRows: false,
        sort: false,
        autoFilter: false,
        pivotTables: false
      };
    }

    XLSX.writeFile(workbook, fileName);

    return { success: true, fileName };
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return { success: false, error };
  }
};

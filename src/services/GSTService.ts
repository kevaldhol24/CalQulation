export interface GSTCalculationInputs {
  amount: number;
  gstRate: number;
  calculationType: "inclusive" | "exclusive";
}

export interface GSTCalculationResults {
  netAmount: number;
  gstAmount: number;
  totalAmount: number;
  effectiveGSTRate: number;
  breakdown: {
    cgst?: number;
    sgst?: number;
    igst?: number;
  };
}

export interface GSTBreakdownItem {
  label: string;
  amount: number;
  percentage: number;
}

export class GSTService {
  /**
   * Calculate GST based on amount and rate
   */
  static calculateGST(inputs: GSTCalculationInputs): GSTCalculationResults {
    const { amount, gstRate, calculationType } = inputs;
    
    if (amount <= 0 || gstRate < 0) {
      throw new Error("Amount must be positive and GST rate cannot be negative");
    }
    
    let netAmount: number;
    let gstAmount: number;
    let totalAmount: number;
    
    if (calculationType === "exclusive") {
      // GST is to be added to the amount
      netAmount = amount;
      gstAmount = (amount * gstRate) / 100;
      totalAmount = amount + gstAmount;
    } else {
      // GST is already included in the amount
      totalAmount = amount;
      netAmount = (amount * 100) / (100 + gstRate);
      gstAmount = amount - netAmount;
    }
    
    const effectiveGSTRate = netAmount > 0 ? (gstAmount / netAmount) * 100 : 0;
    
    // Calculate GST breakdown (CGST + SGST or IGST)
    const breakdown = this.calculateGSTBreakdown(gstAmount, gstRate);
    
    return {
      netAmount: Math.round(netAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      effectiveGSTRate: Math.round(effectiveGSTRate * 100) / 100,
      breakdown,
    };
  }
  
  /**
   * Calculate CGST, SGST, and IGST breakdown
   */
  private static calculateGSTBreakdown(gstAmount: number, gstRate: number) {
    if (gstRate === 0) {
      return {};
    }
    
    // For intra-state: CGST + SGST (each is half of total GST)
    // For inter-state: IGST (full GST amount)
    const cgst = Math.round((gstAmount / 2) * 100) / 100;
    const sgst = Math.round((gstAmount / 2) * 100) / 100;
    const igst = Math.round(gstAmount * 100) / 100;
    
    return {
      cgst,
      sgst,
      igst,
    };
  }
  
  /**
   * Get common GST rates with descriptions
   */
  static getCommonGSTRates() {
    return [
      { rate: 0, label: "0%", description: "Essential items like books, newspapers" },
      { rate: 5, label: "5%", description: "Basic necessities like food grains, milk" },
      { rate: 12, label: "12%", description: "Standard items like mobile phones" },
      { rate: 18, label: "18%", description: "Most services and products" },
      { rate: 28, label: "28%", description: "Luxury items like cars, tobacco" },
    ];
  }
  
  /**
   * Validate GST rate
   */
  static validateGSTRate(rate: number): boolean {
    return rate >= 0 && rate <= 100;
  }
  
  /**
   * Calculate reverse GST (from total to net amount)
   */
  static calculateReverseGST(totalAmount: number, gstRate: number) {
    const netAmount = (totalAmount * 100) / (100 + gstRate);
    const gstAmount = totalAmount - netAmount;
    
    return {
      netAmount: Math.round(netAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
    };
  }
  
  /**
   * Format currency for display
   */
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  
  /**
   * Format percentage for display
   */
  static formatPercentage(percentage: number): string {
    return `${percentage.toFixed(2)}%`;
  }
}

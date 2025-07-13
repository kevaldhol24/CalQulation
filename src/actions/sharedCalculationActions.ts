// Actions for shared calculations
"use server";

import { prisma } from "@/lib/prisma";
import { LoanCalculationInputs } from "~lib/calqulation";

// Create a new shared calculation
export async function createSharedCalculation(
  loanDetails: LoanCalculationInputs
) {
  try {
    // Set expiry time to 24 hours from now
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    // Create new shared calculation
    const sharedCalculation = await prisma.sharedCalculation.create({
      data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: loanDetails as any,
        expiresAt: expiryDate,
      },
    });

    return {
      success: true,
      id: sharedCalculation.id,
      expiresAt: sharedCalculation.expiresAt,
    };
  } catch (error) {
    console.error("Error creating shared calculation:", error);
    return {
      success: false,
      error: "Failed to create shared calculation",
    };
  }
}

// Get a shared calculation by ID
export async function getSharedCalculation(id: string) {
  try {
    // Find the shared calculation
    const sharedCalculation = await prisma.sharedCalculation.findUnique({
      where: { id },
    });

    if (!sharedCalculation) {
      return {
        success: false,
        error: "Shared calculation not found",
      };
    }

    // Check if the calculation has expired
    if (new Date(sharedCalculation.expiresAt) < new Date()) {
      return {
        success: false,
        error: "Shared calculation has expired",
      };
    }

    return {
      success: true,
      loanDetails: sharedCalculation.data as unknown as LoanCalculationInputs,
    };
  } catch (error) {
    console.error("Error retrieving shared calculation:", error);
    return {
      success: false,
      error: "Failed to retrieve shared calculation",
    };
  }
}

// Set up a scheduled task to clean up expired calculations
// This would normally be done with a cron job, but for simplicity
// we'll create a cleanup function that can be called periodically
export async function cleanupExpiredCalculations() {
  try {
    const now = new Date();
    
    const deleted = await prisma.sharedCalculation.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    });

    return {
      success: true,
      deletedCount: deleted.count,
    };
  } catch (error) {
    console.error("Error cleaning up expired calculations:", error);
    return {
      success: false,
      error: "Failed to clean up expired calculations",
    };
  }
}

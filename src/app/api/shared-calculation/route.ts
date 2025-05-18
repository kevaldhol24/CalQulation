// Shared calculations API route handler
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate data exists
    if (!body.loanDetails) {
      return NextResponse.json(
        { error: "Loan details are required" },
        { status: 400 }
      );
    }

    // Create a new shared calculation with 24-hour expiry
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    const sharedCalculation = await prisma.sharedCalculation.create({
      data: {
        data: body.loanDetails,
        expiresAt: expiryDate,
      },
    });

    return NextResponse.json({
      id: sharedCalculation.id,
      expiresAt: sharedCalculation.expiresAt,
    });
  } catch (error) {
    console.error("Error creating shared calculation:", error);
    return NextResponse.json(
      { error: "Failed to create shared calculation" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the id from the query parameter
    const id = request.nextUrl.searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "Shared calculation ID is required" },
        { status: 400 }
      );
    }

    // Find the shared calculation
    const sharedCalculation = await prisma.sharedCalculation.findUnique({
      where: { id },
    });

    if (!sharedCalculation) {
      return NextResponse.json(
        { error: "Shared calculation not found" },
        { status: 404 }
      );
    }

    // Check if the calculation has expired
    if (new Date(sharedCalculation.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: "Shared calculation has expired" },
        { status: 410 }
      );
    }

    // Return the loan details
    return NextResponse.json({
      loanDetails: sharedCalculation.data,
    });
  } catch (error) {
    console.error("Error retrieving shared calculation:", error);
    return NextResponse.json(
      { error: "Failed to retrieve shared calculation" },
      { status: 500 }
    );
  }
}

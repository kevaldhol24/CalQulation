// API route for cleaning up expired shared calculations
import { cleanupExpiredCalculations } from "@/actions/sharedCalculationActions";
import { NextRequest, NextResponse } from "next/server";

// Handle GET request to manually trigger cleanup
export async function GET(request: NextRequest) {
  try {
    // Check for API key authorization (basic protection)
    const apiKey = request.headers.get("x-api-key");
    const configApiKey = process.env.CLEANUP_API_KEY;
    
    if (!configApiKey || apiKey !== configApiKey) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Run the cleanup
    const result = await cleanupExpiredCalculations();
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error cleaning up expired calculations:", error);
    return NextResponse.json(
      { error: "Failed to clean up expired calculations" },
      { status: 500 }
    );
  }
}

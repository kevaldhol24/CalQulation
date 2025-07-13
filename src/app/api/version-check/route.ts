import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const currentVersion = searchParams.get("currentVersion");
    const buildNumber = searchParams.get("buildNumber");
    const platform = searchParams.get("platform");

    // Validate required parameters
    if (!currentVersion || !buildNumber || !platform) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required parameters: currentVersion, buildNumber, and platform are required" 
        },
        { status: 400 }
      );
    }

    // Validate platform
    if (!["android", "ios"].includes(platform.toLowerCase())) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid platform. Must be 'android' or 'ios'" 
        },
        { status: 400 }
      );
    }

    // Fetch the latest version info for the platform
    const versionInfo = await prisma.appVersion.findFirst({
      where: {
        platform: platform.toLowerCase(),
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!versionInfo) {
      return NextResponse.json(
        { 
          success: false, 
          error: `No version information found for platform: ${platform}` 
        },
        { status: 404 }
      );
    }


    // Return version check response
    return NextResponse.json({
      success: true,
      data: {
        latest_version: versionInfo.latestVersion,
        min_required_version: versionInfo.minRequiredVersion,
        update_message: versionInfo.updateMessage,
        play_store_url: versionInfo.playStoreUrl,
        app_store_url: versionInfo.appStoreUrl,
        changelog: versionInfo.changelog,
      },
    });

  } catch (error) {
    console.error("Error in version check API:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error" 
      },
      { status: 500 }
    );
  }
}

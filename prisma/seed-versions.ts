import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedVersionData() {
  try {
    // Seed data for Android
    await prisma.appVersion.upsert({
      where: {
        platform_isActive: {
          platform: "android",
          isActive: true,
        },
      },
      update: {
        latestVersion: "1.2.0",
        minRequiredVersion: "1.0.0",
        updateMessage: "New features and bug fixes are available!",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.calqulation",
        appStoreUrl: null,
        changelog: [
          "• Added new calculator features",
          "• Fixed UI issues",
          "• Improved performance",
          "• Enhanced security"
        ],
      },
      create: {
        platform: "android",
        latestVersion: "1.2.0",
        minRequiredVersion: "1.0.0",
        updateMessage: "New features and bug fixes are available!",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.calqulation",
        appStoreUrl: null,
        changelog: [
          "• Added new calculator features",
          "• Fixed UI issues",
          "• Improved performance",
          "• Enhanced security"
        ],
        isActive: true,
      },
    });

    // Seed data for iOS
    await prisma.appVersion.upsert({
      where: {
        platform_isActive: {
          platform: "ios",
          isActive: true,
        },
      },
      update: {
        latestVersion: "1.2.0",
        minRequiredVersion: "1.0.0",
        updateMessage: "New features and bug fixes are available!",
        playStoreUrl: null,
        appStoreUrl: "https://apps.apple.com/app/calqulation/id123456789",
        changelog: [
          "• Added new calculator features",
          "• Fixed UI issues",
          "• Improved performance",
          "• Enhanced security"
        ],
      },
      create: {
        platform: "ios",
        latestVersion: "1.2.0",
        minRequiredVersion: "1.0.0",
        updateMessage: "New features and bug fixes are available!",
        playStoreUrl: null,
        appStoreUrl: "https://apps.apple.com/app/calqulation/id123456789",
        changelog: [
          "• Added new calculator features",
          "• Fixed UI issues",
          "• Improved performance",
          "• Enhanced security"
        ],
        isActive: true,
      },
    });

    console.log("✅ Version data seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding version data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedVersionData();

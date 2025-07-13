-- CreateTable
CREATE TABLE "AppVersion" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "latestVersion" TEXT NOT NULL,
    "minRequiredVersion" TEXT NOT NULL,
    "updateMessage" TEXT NOT NULL,
    "playStoreUrl" TEXT,
    "appStoreUrl" TEXT,
    "changelog" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AppVersion_platform_idx" ON "AppVersion"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "AppVersion_platform_isActive_key" ON "AppVersion"("platform", "isActive");

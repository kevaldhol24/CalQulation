-- CreateTable
CREATE TABLE "SharedCalculation" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedCalculation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SharedCalculation_expiresAt_idx" ON "SharedCalculation"("expiresAt");

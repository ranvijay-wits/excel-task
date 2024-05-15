-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "info" JSONB NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Data_sku_key" ON "Data"("sku");

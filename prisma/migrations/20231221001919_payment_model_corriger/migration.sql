/*
  Warnings:

  - You are about to drop the column `customerId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceproductId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceserviceId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `staffId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_invoiceproductId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_invoiceserviceId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_staffId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "customerId",
DROP COLUMN "invoiceproductId",
DROP COLUMN "invoiceserviceId",
DROP COLUMN "staffId";

/*
  Warnings:

  - The values [ONLINE] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `CashTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CASH', 'CARD');
ALTER TABLE "Payment" ALTER COLUMN "paymentMethod" TYPE "PaymentMethod_new" USING ("paymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "CashTransaction" DROP CONSTRAINT "CashTransaction_billId_fkey";

-- DropForeignKey
ALTER TABLE "CashTransaction" DROP CONSTRAINT "CashTransaction_invoiceproductId_fkey";

-- DropForeignKey
ALTER TABLE "CashTransaction" DROP CONSTRAINT "CashTransaction_invoiceserviceId_fkey";

-- DropForeignKey
ALTER TABLE "CashTransaction" DROP CONSTRAINT "CashTransaction_staffId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_billId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_invoiceproductId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_invoiceserviceId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_staffId_fkey";

-- DropTable
DROP TABLE "CashTransaction";

-- DropTable
DROP TABLE "Ticket";

-- DropEnum
DROP TYPE "TransactionType";

/*
  Warnings:

  - Added the required column `billId` to the `CashTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceproductId` to the `CashTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceserviceId` to the `CashTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceproductId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceserviceId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceproductId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceserviceId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CashTransaction" ADD COLUMN     "billId" INTEGER NOT NULL,
ADD COLUMN     "invoiceproductId" INTEGER NOT NULL,
ADD COLUMN     "invoiceserviceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "billId" INTEGER NOT NULL,
ADD COLUMN     "invoiceproductId" INTEGER NOT NULL,
ADD COLUMN     "invoiceserviceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "billId" INTEGER NOT NULL,
ADD COLUMN     "invoiceproductId" INTEGER NOT NULL,
ADD COLUMN     "invoiceserviceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CashTransaction" ADD CONSTRAINT "CashTransaction_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashTransaction" ADD CONSTRAINT "CashTransaction_invoiceproductId_fkey" FOREIGN KEY ("invoiceproductId") REFERENCES "InvoiceProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashTransaction" ADD CONSTRAINT "CashTransaction_invoiceserviceId_fkey" FOREIGN KEY ("invoiceserviceId") REFERENCES "InvoiceService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceproductId_fkey" FOREIGN KEY ("invoiceproductId") REFERENCES "InvoiceProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceserviceId_fkey" FOREIGN KEY ("invoiceserviceId") REFERENCES "InvoiceService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_invoiceproductId_fkey" FOREIGN KEY ("invoiceproductId") REFERENCES "InvoiceProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_invoiceserviceId_fkey" FOREIGN KEY ("invoiceserviceId") REFERENCES "InvoiceService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

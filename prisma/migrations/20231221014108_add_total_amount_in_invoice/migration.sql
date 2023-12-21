/*
  Warnings:

  - Added the required column `TotalAmount` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalPaid` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "TotalAmount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "TotalPaid" DECIMAL(65,30) NOT NULL;

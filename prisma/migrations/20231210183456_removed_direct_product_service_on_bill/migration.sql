/*
  Warnings:

  - You are about to drop the column `productId` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Bill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_productId_fkey";

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_serviceId_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "productId",
DROP COLUMN "serviceId";

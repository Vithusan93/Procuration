/*
  Warnings:

  - You are about to drop the column `mail` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `email` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "service" TEXT NOT NULL,
    "staff" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Appointment" ("date", "id", "isPublished", "service", "staff") SELECT "date", "id", "isPublished", "service", "staff" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

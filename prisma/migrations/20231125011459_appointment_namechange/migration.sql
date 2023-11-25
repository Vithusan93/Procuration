/*
  Warnings:

  - Added the required column `staff` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mail" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "staff" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Appointment" ("date", "id", "isPublished", "mail", "service") SELECT "date", "id", "isPublished", "mail", "service" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

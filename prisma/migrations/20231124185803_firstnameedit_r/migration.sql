/*
  Warnings:

  - You are about to drop the column `fistname` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL
);
INSERT INTO "new_Staff" ("email", "id", "lastname", "phone") SELECT "email", "id", "lastname", "phone" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

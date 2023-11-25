-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "service" TEXT NOT NULL,
    "staff" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Appointment" ("date", "email", "id", "isPublished", "service", "staff") SELECT "date", "email", "id", "isPublished", "service", "staff" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "mail" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Appointment" ("date", "id", "mail", "service") SELECT "date", "id", "mail", "service" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

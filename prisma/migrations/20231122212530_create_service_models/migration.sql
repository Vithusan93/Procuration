-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

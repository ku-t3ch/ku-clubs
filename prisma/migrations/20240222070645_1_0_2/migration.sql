-- DropForeignKey
ALTER TABLE "Club" DROP CONSTRAINT "Club_presidentId_fkey";

-- DropForeignKey
ALTER TABLE "Club" DROP CONSTRAINT "Club_secretaryId_fkey";

-- DropForeignKey
ALTER TABLE "Club" DROP CONSTRAINT "Club_treasurerId_fkey";

-- DropForeignKey
ALTER TABLE "Club" DROP CONSTRAINT "Club_vice_presidentId_fkey";

-- AlterTable
ALTER TABLE "Club" ALTER COLUMN "treasurerId" DROP NOT NULL,
ALTER COLUMN "secretaryId" DROP NOT NULL,
ALTER COLUMN "vice_presidentId" DROP NOT NULL,
ALTER COLUMN "presidentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_presidentId_fkey" FOREIGN KEY ("presidentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_vice_presidentId_fkey" FOREIGN KEY ("vice_presidentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_secretaryId_fkey" FOREIGN KEY ("secretaryId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_treasurerId_fkey" FOREIGN KEY ("treasurerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

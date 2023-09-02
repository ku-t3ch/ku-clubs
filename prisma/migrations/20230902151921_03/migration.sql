-- AlterTable
ALTER TABLE "Club" ALTER COLUMN "isPublic" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

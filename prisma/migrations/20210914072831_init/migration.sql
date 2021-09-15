/*
  Warnings:

  - Added the required column `avatar_url` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatar_url" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "website" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `commentAuthorId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_commentAuthorId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "commentAuthorId",
ADD COLUMN     "authorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

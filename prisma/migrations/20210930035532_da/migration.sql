/*
  Warnings:

  - You are about to drop the `_likedPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_likedPosts" DROP CONSTRAINT "_likedPosts_A_fkey";

-- DropForeignKey
ALTER TABLE "_likedPosts" DROP CONSTRAINT "_likedPosts_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likedById" INTEGER;

-- DropTable
DROP TABLE "_likedPosts";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

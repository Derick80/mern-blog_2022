/*
  Warnings:

  - You are about to drop the column `likedById` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_likedComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_likedById_fkey";

-- DropForeignKey
ALTER TABLE "_likedComments" DROP CONSTRAINT "_likedComments_A_fkey";

-- DropForeignKey
ALTER TABLE "_likedComments" DROP CONSTRAINT "_likedComments_B_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "likedByUsersId" INTEGER;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likedById",
ADD COLUMN     "favoriteByUsersId" INTEGER,
ADD COLUMN     "likedByUsersId" INTEGER;

-- DropTable
DROP TABLE "_likedComments";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_likedByUsersId_fkey" FOREIGN KEY ("likedByUsersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_favoriteByUsersId_fkey" FOREIGN KEY ("favoriteByUsersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_likedByUsersId_fkey" FOREIGN KEY ("likedByUsersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

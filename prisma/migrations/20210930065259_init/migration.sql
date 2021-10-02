/*
  Warnings:

  - You are about to drop the column `likedByUsersId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteByUsersId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `likedByUsersId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `favorite` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profileViews` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RealLate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_likedUserProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LikeType" AS ENUM ('LIKED', 'UNLIKE');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_likedByUsersId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_favoriteByUsersId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_likedByUsersId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_likedUserProfile" DROP CONSTRAINT "_likedUserProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_likedUserProfile" DROP CONSTRAINT "_likedUserProfile_B_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "likedByUsersId",
DROP COLUMN "likes",
DROP COLUMN "parentId";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "favoriteByUsersId",
DROP COLUMN "likedByUsersId",
DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "favorite",
DROP COLUMN "likes",
ADD COLUMN     "profileViews" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "firstName",
DROP COLUMN "image",
DROP COLUMN "lastName",
DROP COLUMN "profileViews";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "RealLate";

-- DropTable
DROP TABLE "Word";

-- DropTable
DROP TABLE "_CategoryToPost";

-- DropTable
DROP TABLE "_likedUserProfile";

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "likeType" "LikeType" NOT NULL,
    "userProfileId" INTEGER,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER,
    "commentId" INTEGER,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

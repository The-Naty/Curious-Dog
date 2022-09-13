/*
  Warnings:

  - You are about to drop the column `Like` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `recipeintId` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Question_Like` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `receiver_id` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_authorId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_recipeintId_fkey";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "Like",
DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "recipeintId",
DROP COLUMN "updatedAt",
ADD COLUMN     "asker_id" INTEGER,
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_anonymous" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "receiver_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "profilePicture",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profile_picture" TEXT,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL;

-- DropTable
DROP TABLE "Question_Like";

-- CreateTable
CREATE TABLE "question_likes" (
    "question_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_likes_pkey" PRIMARY KEY ("question_id","user_id")
);

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_asker_id_fkey" FOREIGN KEY ("asker_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_likes" ADD CONSTRAINT "question_likes_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_likes" ADD CONSTRAINT "question_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

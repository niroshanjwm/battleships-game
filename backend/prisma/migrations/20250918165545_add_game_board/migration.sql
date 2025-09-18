/*
  Warnings:

  - You are about to alter the column `player` on the `GameBoard` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(7)`.

*/
-- AlterTable
ALTER TABLE "public"."GameBoard" ALTER COLUMN "player" SET DATA TYPE VARCHAR(7);

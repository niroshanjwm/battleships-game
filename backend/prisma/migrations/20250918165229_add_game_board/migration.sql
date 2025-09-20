/*
  Warnings:

  - Added the required column `player` to the `GameBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."GameBoard" ADD COLUMN     "player" TEXT NOT NULL;

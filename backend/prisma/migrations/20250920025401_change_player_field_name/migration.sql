/*
  Warnings:

  - You are about to drop the column `player` on the `GameBoard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[boardOwner,gameId,row,column]` on the table `GameBoard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `boardOwner` to the `GameBoard` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."GameBoard_player_gameId_row_column_key";

-- AlterTable
ALTER TABLE "public"."GameBoard" DROP COLUMN "player",
ADD COLUMN     "boardOwner" VARCHAR(7) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GameBoard_boardOwner_gameId_row_column_key" ON "public"."GameBoard"("boardOwner", "gameId", "row", "column");

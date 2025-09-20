/*
  Warnings:

  - A unique constraint covering the columns `[player,gameId,row,column]` on the table `GameBoard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GameBoard_player_gameId_row_column_key" ON "public"."GameBoard"("player", "gameId", "row", "column");

-- CreateTable
CREATE TABLE "public"."GameBoard" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "shipId" INTEGER,
    "isHit" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."GameBoard" ADD CONSTRAINT "GameBoard_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GameBoard" ADD CONSTRAINT "GameBoard_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "public"."Ship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

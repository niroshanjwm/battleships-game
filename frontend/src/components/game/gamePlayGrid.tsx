import { Player } from "@/types/game";
import { GridCell } from "@/types/grid";
import GamePlayGridCell from "@/components/game/gamePlayGridCell";
import { Ship } from "@/types/ship";
import { Trophy } from "lucide-react";
import { calculateShotCounts } from "@/utils/grid";

export type GamePlayGridProps = {
  player: Player;
  opponentUsername: string;
  boardOwner: Player;
  grid: GridCell[][];
  playerUsername: string;
  boardLock: boolean;
  playerSunkShips: Ship[];
};

const GamePlayGrid = ({
  player,
  opponentUsername,
  boardOwner,
  grid,
  playerUsername,
  boardLock,
  playerSunkShips,
}: GamePlayGridProps) => {
  const { shots, hits, misses } = calculateShotCounts(grid);

  return (
    <div className="gameplay-grid-container">
      <div className="text-2xl text-center mb-4">
        {player}({playerUsername})
      </div>

      <div className="w-full">
        <div className=" mb-2 mt-2">
          {playerSunkShips.map((ship) => (
            <div
              className="w-auto my-2 flex items-center justify-start"
              key={`${ship.id}-${ship.name}`}
            >
              <Trophy className="text-green-700 mr-1" />
              {playerUsername} sunk {opponentUsername}&apos;s #{ship.id}{" "}
              {ship.name}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between border border-orange-700 px-2 py-1 rounded mb-2">
        <div>Shots: {shots}</div>
        <div>Hits: {hits}</div>
        <div>Misses: {misses}</div>
      </div>

      {grid.map((row, rowIndex) => {
        return (
          <div className="flex" key={`${rowIndex}`}>
            {row.map((column, columnIndex) => {
              return (
                <GamePlayGridCell
                  key={`${rowIndex}-${columnIndex}`}
                  boardLock={boardLock}
                  player={player}
                  boardOwner={boardOwner}
                  row={rowIndex}
                  column={columnIndex}
                  isShot={column.isShot}
                  shipId={column.shipId}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GamePlayGrid;

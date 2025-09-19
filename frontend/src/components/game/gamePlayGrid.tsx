import { Player } from "@/types/game";
import { GridCell } from "@/types/grid";
import GamePlayGridCell from "@/components/game/gamePlayGridCell";
import { Ship } from "@/types/ship";

export type GamePlayGridProps = {
  player: Player;
  grid: GridCell[][];
  playerUsername: string;
  boardLock: boolean;
  playerSunkShips: Ship[];
};

const calculateShotCounts = (
  grid: GridCell[][]
): {
  shots: number;
  hits: number;
  misses: number;
} => {
  return grid.flat().reduce(
    (shot, cell) => {
      if (cell.isShot) {
        shot.shots++;
        if (cell.shipId !== null) {
          shot.hits++;
        } else {
          shot.misses++;
        }
      }
      return shot;
    },
    { shots: 0, hits: 0, misses: 0 }
  );
};

const GamePlayGrid = ({
  player,
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

      <div className="flex justify-between bg-orange-700 px-2 py-1 rounded mb-2">
        <div>Shots: {shots}</div>
        <div>Hits: {hits}</div>
        <div>Misses: {misses}</div>
      </div>

      <div className="w-full">
        <div className="text-xl text-center">Sunk Ships</div>
        <div className="flex justify-center mb-2 mt-2">
          {playerSunkShips.map((ship) => (
            <div
              className="border p-1 w-auto mx-1"
              key={`${ship.id}-${ship.name}`}
            >
              #{ship.id} {ship.name}
            </div>
          ))}
        </div>
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

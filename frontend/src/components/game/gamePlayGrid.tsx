import { Player } from "@/types/game";
import { GridCell } from "@/types/grid";
import GamePlayGridCell from "@/components/game/gamePlayGridCell";

export type GamePlayGridProps = {
  player: Player;
  grid: GridCell[][];
  playerUsername: string;
  boardLock: boolean;
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
}: GamePlayGridProps) => {
  const { shots, hits, misses } = calculateShotCounts(grid);

  return (
    <div className="gameplay-grid-container">
      <div className="text-2xl text-center mb-4">
        {player}({playerUsername})
      </div>
      <div className="flex justify-between bg-orange-700 px-2 py-1 rounded mb-2">
        <div>Shot: {shots}</div>
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

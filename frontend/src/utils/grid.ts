import { GridCell } from "@/types/grid";

export const generateIntialGrid = (length: number): GridCell[][] => {
  return Array.from({ length }).map(() =>
    Array.from({ length }).map(() => ({
      occupied: false,
      shipId: null,
      isShot: false,
    }))
  );
};

export const calculateShotCounts = (
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

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

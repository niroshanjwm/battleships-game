import { GridLength } from "@/constants/grid";
import { GridCell } from "@/types/grid";
import React, { createContext, useContext, ReactNode, useState } from "react";

export type GridContextType = {
  grid: GridCell[][];
  canDropShip: (
    shipLength: number,
    rowId: number,
    columnId: number
  ) => { canDrop: boolean; message: string };
  dropShip: (shipId: number, shipLength: number, x: number, y: number) => void;
  reset: () => void;
};

const GridContext = createContext<GridContextType | undefined>(undefined);

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGridContext must be used within GridProvider");
  }
  return context;
};

export const GridProvider = ({ children }: { children: ReactNode }) => {
  const [grid, setGrid] = useState<GridCell[][]>(
    Array.from({ length: GridLength }).map(() =>
      Array.from({ length: GridLength }).map(() => ({
        occupied: false,
        shipId: null,
      }))
    )
  );

  const canDropShip = (shipLength: number, rowId: number, columnId: number) => {
    // the length of ship from the position should be less that grid length
    if (columnId + shipLength > GridLength) {
      return {
        canDrop: false,
        message: "There is no enough space to drop the ship",
      };
    }

    // Check the any other ship is occupied in the grid
    for (let i = 0; i < shipLength; i++) {
      console.log(grid[rowId][columnId + i], "grid[rowId][columnId + i]");
      if (grid[rowId][columnId + i].occupied) {
        return {
          canDrop: false,
          message: "Ship is obstruct with another ship",
        };
      }
    }

    return { canDrop: true, message: "Can drop successfully" };
  };

  const dropShip = (
    shipId: number,
    shipLength: number,
    rowId: number,
    columnId: number
  ) => {
    setGrid((previousGrid: GridCell[][]) => {
      const shipAddingGrid = previousGrid.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      for (let i = 0; i < shipLength; i++) {
        shipAddingGrid[rowId][columnId + i] = { occupied: true, shipId };
      }
      return shipAddingGrid;
    });
  };

  const reset = () => {
    setGrid(
      Array.from({ length: GridLength }).map(() =>
        Array.from({ length: GridLength }).map(() => ({
          occupied: false,
          shipId: null,
        }))
      )
    );
  };

  return (
    <GridContext.Provider value={{ grid, canDropShip, dropShip, reset }}>
      {children}
    </GridContext.Provider>
  );
};

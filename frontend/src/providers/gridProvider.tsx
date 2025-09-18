import { GridCell } from "@/types/grid";
import React, { createContext, useContext, ReactNode, useState } from "react";

export type GridContextType = {
  grid: GridCell[][];
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
  const [grid, setGrd] = useState<GridCell[][]>(
    Array.from({ length: 10 }).map(() =>
      Array.from({ length: 10 }).map(() => ({ occupied: false, shipId: null }))
    )
  );

  return (
    <GridContext.Provider value={{ grid }}>{children}</GridContext.Provider>
  );
};

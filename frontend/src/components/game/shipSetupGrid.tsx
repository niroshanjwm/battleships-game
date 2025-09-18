import { useDrop } from "react-dnd";
import { GridCell } from "@/types/grid";
import ShipSetupGridCell from "@/components/game/shipSetupGridCell";

export type ShipSetupGridProps = {
  grid: GridCell[][];
};

const ShipSetupGrid = ({ grid }: ShipSetupGridProps) => {
  return grid.map((row, x) => (
    <div className="row w-auto flex" key={x}>
      {row.map((cell, y) => {
        return (
          <ShipSetupGridCell
            key={`${x}-${y}`}
            cordinate={{ x, y }}
            occupied={cell.occupied}
            shipId={cell.shipId}
          />
        );
      })}
    </div>
  ));
};

export default ShipSetupGrid;

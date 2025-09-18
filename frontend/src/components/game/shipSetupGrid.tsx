import { GridCell } from "@/types/grid";
import ShipSetupGridCell from "@/components/game/shipSetupGridCell";

export type ShipSetupGridProps = {
  grid: GridCell[][];
};

const ShipSetupGrid = ({ grid }: ShipSetupGridProps) => {
  return grid.map((row, rowId) => (
    <div className="row w-auto flex" key={rowId}>
      {row.map((cell, columnId) => {
        return (
          <ShipSetupGridCell
            key={`${rowId}-${columnId}`}
            cordinate={{ rowId, columnId }}
            occupied={cell.occupied}
            shipId={cell.shipId}
          />
        );
      })}
    </div>
  ));
};

export default ShipSetupGrid;

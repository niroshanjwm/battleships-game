import { GridCell } from "@/types/grid";
import ShipSetupGridCell from "@/components/game/shipSetupGridCell";
import { Player } from "@/types/game";

export type ShipSetupGridProps = {
  grid: GridCell[][];
  player: Player;
};

const ShipSetupGrid = ({ grid, player }: ShipSetupGridProps) => {
  return grid.map((row, rowIndex) => (
    <div className="row w-auto flex" key={rowIndex}>
      {row.map((column, columnIndex) => {
        return (
          <ShipSetupGridCell
            key={`${row}-${columnIndex}`}
            cordinate={{ row: rowIndex, column: columnIndex }}
            occupied={column.occupied}
            shipId={column.shipId}
            player={player}
          />
        );
      })}
    </div>
  ));
};

export default ShipSetupGrid;

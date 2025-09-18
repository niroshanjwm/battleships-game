import { GridCell } from "@/types/grid";
import ShipSetupGridCell from "@/components/game/shipSetupGridCell";
import { Player } from "@/types/game";

export type ShipSetupGridProps = {
  grid: GridCell[][];
  player: Player;
};

const ShipSetupGrid = ({ grid, player }: ShipSetupGridProps) => {
  return grid.map((row, rowId) => (
    <div className="row w-auto flex" key={rowId}>
      {row.map((cell, columnId) => {
        return (
          <ShipSetupGridCell
            key={`${rowId}-${columnId}`}
            cordinate={{ rowId, columnId }}
            occupied={cell.occupied}
            shipId={cell.shipId}
            player={player}
          />
        );
      })}
    </div>
  ));
};

export default ShipSetupGrid;

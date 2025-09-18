import { useGridContext } from "@/providers/gridProvider";
import { Ship } from "@/types/ship";
import { useRef } from "react";
import { useDrop } from "react-dnd";

export type ShipSetupGridCellProps = {
  shipId: number | null;
  occupied: boolean;
  cordinate: { rowId: number; columnId: number };
};
const ShipSetupGridCell = ({
  shipId,
  occupied,
  cordinate: { rowId, columnId },
}: ShipSetupGridCellProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { canDropShip, dropShip } = useGridContext();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ship",
    drop: (ship: Ship) => {
      const { canDrop, message } = canDropShip(ship.length, rowId, columnId);
      if (canDrop) {
        dropShip(ship.id, ship.length, rowId, columnId);
      }
      return { status: canDrop, message };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(ref);

  return (
    <div
      ref={ref}
      className={`cell border h-12 w-12 flex items-center justify-center ${
        isOver ? "bg-white text-black" : ""
      } ${occupied ? "bg-red-100 text-black" : ""}`}
    >
      {occupied ? "Y" : "N"} {shipId}
    </div>
  );
};

export default ShipSetupGridCell;

import { useRef } from "react";
import { useDrop } from "react-dnd";

export type ShipSetupGridCellProps = {
  shipId: number | null;
  occupied: boolean;
  cordinate: { x: number; y: number };
};
const ShipSetupGridCell = ({
  shipId,
  occupied,
  cordinate: { x, y },
}: ShipSetupGridCellProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ship",
    drop: (item) => {
      console.log(item, "item", new Date().toString());
      return { x, y };
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
        isOver ? "bg-white" : ""
      }`}
    >
      {y}
    </div>
  );
};

export default ShipSetupGridCell;

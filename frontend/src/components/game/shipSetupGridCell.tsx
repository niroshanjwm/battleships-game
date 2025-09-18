import { setPlayerShips } from "@/redux/slices/game/gameSlice";
import { dropShip } from "@/redux/slices/ship/shipThunk";
import { useAppDispatch } from "@/redux/store";
import { Player } from "@/types/game";
import { Ship } from "@/types/ship";
import { useRef } from "react";
import { useDrop } from "react-dnd";

export type ShipSetupGridCellProps = {
  shipId: number | null;
  occupied: boolean;
  cordinate: { row: number; column: number };
  player: Player;
};

const ShipSetupGridCell = ({
  shipId,
  occupied,
  cordinate: { row, column },
  player,
}: ShipSetupGridCellProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ship",
    drop: (ship: Ship) => {
      dispatch(
        dropShip({
          player,
          ship,
          row,
          column,
        })
      )
        .unwrap()
        .then((result) => {
          if (result.status) {
            dispatch(setPlayerShips({ player, ship }));
          }
        });
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
      } ${occupied ? "bg-white text-black" : ""}`}
    >
      {occupied ? `#${shipId}` : ""}
    </div>
  );
};

export default ShipSetupGridCell;

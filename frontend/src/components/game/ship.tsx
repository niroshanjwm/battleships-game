import { Ship as ShipType } from "@/types/ship";
import { useRef, useState } from "react";
import { useDrag } from "react-dnd";

export type ShipProps = {
  id: number;
  length: number;
  name: string;
};

type DropResult = { status: boolean; ship: ShipType };

const Ship = ({ id, name, length }: ShipProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [dropped, setDropped] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ship",
    item: () => {
      return { id, name, length };
    },
    end: (_ship, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (dropResult) {
        setDropped(dropResult.status);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const generateShipLength = (length: number) => {
    return Array.from({ length }).map((_, index) => {
      return (
        <div className="border p-1 w-8 h-8" key={`${index}`}>
          &nbsp;
        </div>
      );
    });
  };

  drag(ref);

  if (dropped) {
    return <div className="">{name} is dropped</div>;
  }

  return (
    <div
      ref={ref}
      className={`ship ${isDragging ? "bg-white" : "bg-tranparent"}`}
    >
      <div className="mt-2">
        #{id} {name}
      </div>
      <div className="flex mb-5">{generateShipLength(length)}</div>
    </div>
  );
};

export default Ship;

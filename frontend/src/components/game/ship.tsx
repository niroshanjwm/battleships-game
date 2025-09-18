import { useRef } from "react";
import { useDrag } from "react-dnd";

export type ShipProps = {
  id: number;
  length: number;
  name: string;
};

const Ship = ({ id, name, length }: ShipProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ship",
    item: () => {
      return { id, name, length };
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

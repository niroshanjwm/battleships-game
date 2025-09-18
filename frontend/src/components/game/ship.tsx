import { useRef } from "react";
import { useDrag } from "react-dnd";

export type ShipProps = {
  id: number;
  length: number;
  name: string;
};

type DropResult = {
  x: number;
  y: number;
};

const Ship = ({ id, name, length }: ShipProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ship",
    item: { id, name, length },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        console.log(
          `You dropped ${item.id} ${item.name} into ${dropResult.x}, ${dropResult.y}!`
        );
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

  return (
    <div
      ref={ref}
      className={`ship ${isDragging ? "bg-white" : "bg-tranparent"}`}
    >
      <div className="mt-2">{name}</div>
      <div className="flex mb-5">{generateShipLength(length)}</div>
    </div>
  );
};

export default Ship;

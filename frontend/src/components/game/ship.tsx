import { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";

export type ShipProps = {
  id: number;
  length: number;
  name: string;
  onShipDropError: (error: string) => void;
};

type DropResult = { status: boolean; message: string };

const Ship = ({ id, name, length, onShipDropError }: ShipProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [dropped, setDropped] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    onShipDropError(error);
  }, [error, onShipDropError]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ship",
    item: () => {
      setError("");
      return { id, name, length };
    },
    end: (ship, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (ship && dropResult) {
        setDropped(dropResult.status);
      }
      if (!dropResult?.status) {
        setError(dropResult?.message as string);
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

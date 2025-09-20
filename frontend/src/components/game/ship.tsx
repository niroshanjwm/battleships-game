import { ShipAlignment } from "@/types/ship";
import { RotateCw } from "lucide-react";
import { useRef, useState } from "react";
import { useDrag } from "react-dnd";

export type ShipProps = {
  id: number;
  length: number;
  name: string;
};

const Ship = ({ id, name, length }: ShipProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [alignment, setAlignment] = useState<ShipAlignment>(
    ShipAlignment.Horizontal
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ship",
      item: () => {
        return { id, name, length, alignment };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [alignment]
  );

  const generateShipLength = (length: number, alignment: ShipAlignment) => {
    return (
      <div
        className={`flex ${
          alignment === ShipAlignment.Vertical ? "flex-col" : ""
        }`}
      >
        {Array.from({ length }).map((_, index) => {
          return (
            <div className={`border p-1 w-8 h-8`} key={`${index}`}>
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  drag(ref);

  const rotateHandler = () => {
    setAlignment((previousAlignment) => {
      return previousAlignment === ShipAlignment.Horizontal
        ? ShipAlignment.Vertical
        : ShipAlignment.Horizontal;
    });
  };

  return (
    <div
      ref={ref}
      className={`ship ${isDragging ? "bg-white" : "bg-tranparent"}`}
    >
      <div className="mt-2 flex mb-1">
        #{id} {name}{" "}
        <RotateCw onClick={rotateHandler} className="ml-2 text-green-700 cursor-pointer" size={20} />
      </div>
      <div className="flex mb-5 items-center ">
        {generateShipLength(length, alignment)}.
      </div>
    </div>
  );
};

export default Ship;

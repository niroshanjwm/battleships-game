import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Ship from "@/components/game/ship";
import { useGridContext } from "@/providers/gridProvider";
import ShipSetupGrid from "@/components/game/shipSetupGrid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ShipSetup = () => {
  const { ships } = useSelector((state: RootState) => state.game);
  const { grid } = useGridContext();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex">
        <div className="w-1/2 flex justify-center">
          <div className="">
            <div className="text-2xl">Grid</div>
            <p>Move ships in ship list to this grid</p>
            <ShipSetupGrid grid={grid} />
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <div className="p-1">
            <div className="text-2xl">Ship List</div>
            {ships.map((ship) => (
              <Ship
                id={ship.id}
                key={`${ship.id}`}
                name={ship.name}
                length={ship.length}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ShipSetup;

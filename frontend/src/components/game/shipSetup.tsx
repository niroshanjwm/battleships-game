import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Ship from "@/components/game/ship";

const ShipSetup = () => {
  const { ships } = useSelector((state: RootState) => state.game);

  return (
    <div className="w-full flex">
      <div className="w-1/2">
        <div>Grid</div>
      </div>
      <div className="w-1/2 flex justify-center">
        <div className="p-1">
          <p className="text-2xl">Ship List</p>
          {ships.map((ship) => (
            <Ship
              key={`${ship.name}-${ship.length}`}
              name={ship.name}
              length={ship.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShipSetup;

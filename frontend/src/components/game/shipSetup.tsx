import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import Ship from "@/components/game/ship";
import ShipSetupGrid from "@/components/game/shipSetupGrid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Button from "@/components/ui/button";
import { saveShips } from "@/redux/slices/ship/shipThunk";
import { Player } from "@/types/game";

export type ShipSetupProps = {
  player: Player;
  username: string;
};

const ShipSetup = ({ player, username }: ShipSetupProps) => {
  const dispatch = useAppDispatch();
  const { ships, gameId } = useSelector((state: RootState) => state.game);

  const playerGrid = useSelector((state: RootState) => {
    return player === Player.PlayerA
      ? state.game.playerAGrid
      : state.game.playerBGrid;
  });

  const playerError = useSelector((state: RootState) => {
    return player === Player.PlayerA
      ? state.game.playerAGridError
      : state.game.playerBGridError;
  });

  const playerShips = useSelector((state: RootState) => {
    return player === Player.PlayerA
      ? state.game.playerAShips
      : state.game.playerBShips;
  }).map((ship) => ship.id);

  const saveShipSetupHandler = () => {
    dispatch(saveShips({ gameId, player, grid: playerGrid }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full p-10">
        <div className="w-full text-center mb-5">
          <div className="text-2xl">
            {player}({username}) - Ship setup
          </div>
          <p>Move ships from ship list to this grid</p>
          <p className="text-sm text-red-500">{playerError}</p>
        </div>
        <div className="flex">
          <div className="w-1/2 flex justify-center">
            <div className="grid-container">
              <ShipSetupGrid grid={playerGrid} player={player} />
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="p-1">
              <div className="text-2xl mb-2">Ship List</div>
              {ships
                .filter((ship) => !playerShips.includes(ship.id))
                .map((ship) => (
                  <Ship
                    id={ship.id}
                    key={`${ship.id}`}
                    name={ship.name}
                    length={ship.length}
                  />
                ))}
              <Button className="mt-5" onClick={() => saveShipSetupHandler()}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ShipSetup;

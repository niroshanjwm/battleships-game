import GamePlayGrid from "@/components/game/gamePlayGrid";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectPlayerData } from "@/redux/slices/game/gameSelectors";

const GamePlay = () => {
  const { turn } = useSelector((state: RootState) => state.game);
  const { playerGrid, playerUsername, switchingPlayers, boardLock } =
    useSelector(selectPlayerData(turn));

  return (
    <div>
      {switchingPlayers ? (
        <div className="text-xl">Please wait, it’s your opponent’s turn…</div>
      ) : (
        <GamePlayGrid
          boardLock={boardLock}
          player={turn}
          grid={playerGrid}
          playerUsername={playerUsername}
        />
      )}
    </div>
  );
};

export default GamePlay;

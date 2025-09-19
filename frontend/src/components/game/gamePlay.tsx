import GamePlayGrid from "@/components/game/gamePlayGrid";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { makeSelectPlayerData } from "@/redux/slices/game/gameSelectors";

const GamePlay = () => {
  const { turn } = useSelector((state: RootState) => state.game);
  const {
    playerUsername,
    switchingPlayers,
    boardLock,
    playerSunkShips,
    opponentGrid,
    boardOwner,
    opponentUsername,
  } = useSelector(makeSelectPlayerData(turn));

  return (
    <div>
      {switchingPlayers ? (
        <div className="text-xl">
          Please wait, it&apos;s your opponent’s turn
        </div>
      ) : (
        <GamePlayGrid
          boardLock={boardLock}
          player={turn}
          boardOwner={boardOwner}
          grid={opponentGrid}
          playerUsername={playerUsername}
          opponentUsername={opponentUsername}
          playerSunkShips={playerSunkShips}
        />
      )}
    </div>
  );
};

export default GamePlay;

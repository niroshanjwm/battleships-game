import GamePlayGrid from "@/components/game/gamePlayGrid";
import { setPlayerTurn } from "@/redux/slices/game/gameSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { Player } from "@/types/game";
import { useSelector } from "react-redux";
import Button from "@/components/ui/button";

const GamePlay = () => {
  const dispatch = useAppDispatch();
  const { turn } = useSelector((state: RootState) => state.game);

  const playerTurnHandler = () => {
    dispatch(
      setPlayerTurn(turn === Player.PlayerA ? Player.PlayerB : Player.PlayerA)
    );
  };

  return (
    <div>
      <GamePlayGrid player={turn} />
      <Button onClick={playerTurnHandler}>Click</Button>
    </div>
  );
};

export default GamePlay;

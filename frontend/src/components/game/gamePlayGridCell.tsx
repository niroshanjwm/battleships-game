import { playerHit } from "@/redux/slices/game/gameThunk";
import { RootState, useAppDispatch } from "@/redux/store";
import { Player } from "@/types/game";
import { Ban, Check } from "lucide-react";
import { useSelector } from "react-redux";

export type GamePlayGridCellProps = {
  player: Player;
  isShot: boolean;
  shipId: number | null;
  row: number;
  column: number;
  boardLock: boolean;
};

const GamePlayGridCell = ({
  player,
  isShot,
  shipId,
  row,
  column,
  boardLock,
}: GamePlayGridCellProps) => {
  const dispatch = useAppDispatch();
  const { gameId } = useSelector((state: RootState) => state.game);

  const playerShotHandler = () => {
    // this will prevent another hit on already hitted grid cells and maintain board lock
    if (isShot || boardLock) {
      return;
    }
    dispatch(playerHit({ player, row, column, shipId, gameId }));
  };

  return (
    <div
      onClick={playerShotHandler}
      className={`h-15 w-15 border border-white text-white text-center text-black flex items-center justify-center hover:bg-white hover:text-black ${
        isShot ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {isShot ? (
        shipId ? (
          <Check className="text-green-700" />
        ) : (
          <Ban className="text-red-700" />
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default GamePlayGridCell;

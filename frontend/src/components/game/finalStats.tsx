import { makeSelectPlayerData } from "@/redux/slices/game/gameSelectors";
import { getGameStats } from "@/redux/slices/game/gameThunk";
import { useAppDispatch } from "@/redux/store";
import { Player } from "@/types/game";
import { calculateShotCounts } from "@/utils/grid";
import { formatTime } from "@/utils/time";
import { Ban, Check, Trophy } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@/components/ui/button";
import { setDefaultState } from "@/redux/slices/game/gameSlice";

export type FinalStatsProps = {
  winner: Player | null;
};

const FinalStats = ({ winner }: FinalStatsProps) => {
  const dispatch = useAppDispatch();

  const { playerUsername, opponentGrid, boardOwner, gameId, winnerGameStats } =
    useSelector(makeSelectPlayerData(winner as Player));

  const { shots, hits, misses } = calculateShotCounts(opponentGrid);

  useEffect(() => {
    dispatch(getGameStats({ gameId: gameId as number, boardOwner }));
  }, []);

  const playAgainHandler = () => {
    dispatch(setDefaultState());
  };

  return (
    <div>
      <div className="text-center flex justify-center flex-col items-center">
        <Trophy size={50} className="text-green-700 mb-3" />
        <div className="text-xl">
          Congratulations you won {winner}({playerUsername})!
        </div>
      </div>

      <div className="mt-5 flex justify-between border border-orange-700 px-2 py-1 rounded mb-2">
        <div>Shots: {shots}</div>
        <div>Hits: {hits}</div>
        <div>Misses: {misses}</div>
      </div>

      <div className="mt-5">
        {winnerGameStats.map((gameStat, i) => {
          const { updatedAt, row, column, shipId, ship } = gameStat;
          return (
            <div className="text-sm flex" key={`${i}`}>
              {shipId ? (
                <Check className="text-green-700 mr-2" />
              ) : (
                <Ban className="text-red-700 mr-2" />
              )}{" "}
              At {formatTime(updatedAt)}, you shot to position(
              {row},{column}), and{" "}
              {shipId
                ? `successfully shot to #${shipId} ${ship?.name}`
                : "missed"}
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <Button onClick={playAgainHandler}>Play again</Button>
      </div>
    </div>
  );
};

export default FinalStats;

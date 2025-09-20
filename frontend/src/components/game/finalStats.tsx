import { makeSelectPlayerData } from "@/redux/slices/game/gameSelectors";
import { Player } from "@/types/game";
import { calculateShotCounts } from "@/utils/grid";
import { Trophy } from "lucide-react";
import { useSelector } from "react-redux";

export type FinalStatsProps = {
  winner: Player | null;
};

const FinalStats = ({ winner }: FinalStatsProps) => {
  const { playerUsername, opponentGrid } = useSelector(
    makeSelectPlayerData(winner as Player)
  );

  const { shots, hits, misses } = calculateShotCounts(opponentGrid);

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

    </div>
  );
};

export default FinalStats;

import { Player } from "@/types/game";

export type GamePlayGridProps = {
  player: Player;
};
const GamePlayGrid = ({ player }: GamePlayGridProps) => {
  return "GamePlayGrid " + player;
};

export default GamePlayGrid;

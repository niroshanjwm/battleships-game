import { GameState } from "@/redux/slices/game/gameSlice";
import { Player } from "@/types/game";

export const getPlayerGrid = (state: GameState, player: Player) => {
  return player === Player.PlayerA ? state.playerAGrid : state.playerBGrid;
};

export const getPlayerError = (player: Player) => {
  return player === Player.PlayerA ? "playerAGridError" : "playerBGridError";
};

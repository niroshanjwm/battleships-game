import { RootState } from "@/redux/store";
import { GameStep, Player } from "@/types/game";
import { GridCell } from "@/types/grid";
import { Ship as ShipType } from "@/types/ship";

export type PlayerDataSelector = {
  loading: boolean;
  error: string | null;
  gameId: number | null;
  turn: Player;
  switchingPlayers: boolean;
  boardLock: boolean;
  currentStep: GameStep;
  playerUsername: string;
  playerGrid: GridCell[][];
  playerShips: ShipType[];
  playerGridError: string;
  ships: ShipType[];
};

export const selectPlayerData =
  (player: Player) =>
  (state: RootState): PlayerDataSelector => {
    const baseState = {
      loading: state.game.loading,
      error: state.game.error,
      gameId: state.game.gameId,
      turn: state.game.turn,
      currentStep: state.game.currentStep,
      ships: state.game.ships,
      switchingPlayers: state.game.switchingPlayers,
      boardLock: state.game.boardLock,
    };

    if (player === Player.PlayerA) {
      return {
        ...baseState,
        playerUsername: state.game.playerAUsername,
        playerGrid: state.game.playerAGrid,
        playerShips: state.game.playerAShips,
        playerGridError: state.game.playerAGridError,
      };
    }

    return {
      ...baseState,
      playerUsername: state.game.playerBUsername,
      playerGrid: state.game.playerBGrid,
      playerShips: state.game.playerBShips,
      playerGridError: state.game.playerBGridError,
    };
  };

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Player } from "@/types/game";

export const makeSelectPlayerData = (player: Player) =>
  createSelector(
    (state: RootState) => state.game,
    (game) => {
      const baseState = {
        loading: game.loading,
        error: game.error,
        gameId: game.gameId,
        turn: game.turn,
        currentStep: game.currentStep,
        ships: game.ships,
        switchingPlayers: game.switchingPlayers,
        boardLock: game.boardLock,
        winner: game.winner,
        winnerGameStats: game.winnerGameStats,
      };

      if (player === Player.PlayerA) {
        return {
          ...baseState,
          playerUsername: game.playerAUsername,
          playerGrid: game.playerAGrid,
          playerShips: game.playerAShips,
          playerSunkShips: game.playerASunkShips,
          playerGridError: game.playerAGridError,

          opponentGrid: game.playerBGrid,
          boardOwner: Player.PlayerB,
          opponentUsername: game.playerBUsername,
        };
      }

      return {
        ...baseState,
        playerUsername: game.playerBUsername,
        playerGrid: game.playerBGrid,
        playerShips: game.playerBShips,
        playerSunkShips: game.playerBSunkShips,
        playerGridError: game.playerBGridError,

        opponentGrid: game.playerAGrid,
        boardOwner: Player.PlayerA,
        opponentUsername: game.playerAUsername,
      };
    }
  );

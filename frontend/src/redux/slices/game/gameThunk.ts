import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "@/services/http";
import {
  CreateGamePayload,
  CreateGameResponse,
  CreateGameHitResponse,
  Player,
  PlayerHitPayload,
} from "@/types/game";
import {
  setSwitchingPlayers,
  setPlayerHit,
  setPlayerTurn,
  setBoardLock,
  setError,
  setSunkShips,
} from "@/redux/slices/game/gameSlice";
import { sleep } from "@/utils/time";

export const createGame = createAsyncThunk(
  "game/createGame",
  async ({ playerA, playerB }: CreateGamePayload) => {
    const response = await post<CreateGameResponse>(`/game`, {
      playerA,
      playerB,
    });
    return response.data.id;
  }
);

export const playerHit = createAsyncThunk(
  "game/playerHit",
  async (
    { player, boardOwner, row, column, gameId }: PlayerHitPayload,
    { dispatch }
  ) => {
    // this is to make sure only allow one shot for each players turn
    dispatch(setBoardLock(true));
    dispatch(setPlayerHit({ boardOwner, row, column }));

    try {
      // even the API is getting failed the game can be play continuously, only sunk ships are not available
      const response = await post<CreateGameHitResponse>(`/game/hit`, {
        player: boardOwner, // need to refactor to change the field name as boardOwner
        row,
        column,
        gameId,
      });

      const sunkShips = response.data.sunkShips
        .filter((ship) => ship.isSunk) // filtering only sunk ships
        .map((ship) => ({
          id: ship.shipId,
          name: ship.name,
          length: ship.length,
        }));

      dispatch(
        setSunkShips({
          player,
          ships: sunkShips,
        })
      );
    } catch (error) {
      dispatch(setError((error as Error).message));
    }

    // adding sleeps to improve player turn transitions
    await sleep(1000);
    dispatch(setSwitchingPlayers(true));
    await sleep(2000);
    dispatch(
      setPlayerTurn(player === Player.PlayerA ? Player.PlayerB : Player.PlayerA)
    );
    dispatch(setSwitchingPlayers(false));
    dispatch(setBoardLock(false));
  }
);

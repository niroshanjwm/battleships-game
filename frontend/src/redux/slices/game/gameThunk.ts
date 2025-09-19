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
    { player, row, column, shipId, gameId }: PlayerHitPayload,
    { dispatch }
  ) => {
    dispatch(setBoardLock(true)); // this is to make sure only allow one shot for each players turn
    dispatch(setPlayerHit({ player, row, column }));

    await sleep(1000);
    dispatch(setSwitchingPlayers(true));

    try {
      // even the API is getting failed the game can be play continuously
      await post<CreateGameHitResponse>(`/game/hit`, {
        player,
        row,
        column,
        gameId,
      });
    } catch (error) {
      dispatch(setError((error as Error).message));
    }

    await sleep(2000);
    dispatch(
      setPlayerTurn(player === Player.PlayerA ? Player.PlayerB : Player.PlayerA)
    );
    dispatch(setSwitchingPlayers(false));
    dispatch(setBoardLock(false));
  }
);

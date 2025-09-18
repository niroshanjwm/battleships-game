import { FetchShipsResponse, Ship } from "@/types/ship";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "@/services/http";
import {
  CreateGamePayload,
  CreateGameResponse,
  SaveShipsPayload,
  SaveShipsResponse,
} from "@/types/game";

export const fetchShips = createAsyncThunk("game/fetchShips", async () => {
  const response = await get<FetchShipsResponse>(`/ship`);
  return response.data.ships;
});

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

export const saveShips = createAsyncThunk(
  "game/saveShips",
  async ({ gameId, player, grid }: SaveShipsPayload) => {
    const response = await post<SaveShipsResponse>(`/game/ship`, {
      gameId,
      player,
      grid,
    });
    return response.data;
  }
);

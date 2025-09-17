import { FetchShipsResponse, Ship } from "@/types/ship";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "@/services/http";
import { CreateGamePayload, CreateGameResponse } from "@/types/game";

export const fetchShips = createAsyncThunk("game/fetchShips", async () => {
  const response = await get<FetchShipsResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/ship`
  );
  return response.data.ships;
});

export const createGame = createAsyncThunk(
  "game/createGame",
  async ({ playerA, playerB }: CreateGamePayload) => {
    const response = await post<CreateGameResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/game`,
      { playerA, playerB }
    );
    return response.data.id;
  }
);

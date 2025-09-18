import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "@/services/http";
import { CreateGamePayload, CreateGameResponse } from "@/types/game";

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

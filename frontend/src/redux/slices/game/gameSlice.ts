import { GameStep } from "@/types/game";
import { Ship } from "@/types/ship";
import { createSlice } from "@reduxjs/toolkit";
import { createGame, fetchShips } from "./gameThunk";

type GameState = {
  loading: boolean;
  error: string | null;
  gameId: number | null;
  currentStep: GameStep;
  playerAUsername: string;
  playerBUsername: string;
  ships: Ship[];
};

const initialState: GameState = {
  loading: false,
  error: null,
  gameId: null,
  currentStep: GameStep.PlayerARegister,
  playerAUsername: "",
  playerBUsername: "",
  ships: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCurrentStep(state, action: { payload: GameStep }) {
      state.currentStep = action.payload;
    },
    setPlayerAUsername(state, action: { payload: string }) {
      state.playerAUsername = action.payload;
      state.currentStep = GameStep.PlayerBRegister;
    },
    setPlayerBUsername(state, action: { payload: string }) {
      state.playerBUsername = action.payload;
      state.currentStep = GameStep.PlayerAShipSetup;
    },
  },
  extraReducers: (builder) => {
    /** Fetch ships */
    builder
      .addCase(fetchShips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShips.fulfilled, (state, action) => {
        state.loading = false;
        state.ships = action.payload;
      })
      .addCase(fetchShips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch ships";
      })
      /** Fetch ships */
      .addCase(createGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.loading = false;
        state.gameId = action.payload;
      })
      .addCase(createGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed create game";
      });
  },
});

export const { setCurrentStep, setPlayerAUsername, setPlayerBUsername } =
  gameSlice.actions;
export default gameSlice.reducer;

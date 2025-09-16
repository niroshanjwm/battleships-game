import { GameStep } from "@/types/game";
import { createSlice } from "@reduxjs/toolkit";

type GameState = {
  currentStep: GameStep;
  playerAUsername: string;
  playerBUsername: string;
};

const initialState: GameState = {
  currentStep: GameStep.PlayerARegister,
  playerAUsername: "",
  playerBUsername: "",
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
});

export const { setCurrentStep, setPlayerAUsername, setPlayerBUsername } =
  gameSlice.actions;
export default gameSlice.reducer;

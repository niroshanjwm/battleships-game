import { GameStep, Player } from "@/types/game";
import { Ship as ShipType } from "@/types/ship";
import { createSlice } from "@reduxjs/toolkit";
import { createGame } from "@/redux/slices/game/gameThunk";
import { fetchShips, saveShips } from "@/redux/slices/ship/shipThunk";
import { GridCell } from "@/types/grid";
import { GridLength } from "@/constants/grid";
import { generateIntialGrid } from "@/utils/grid";

export type GameState = {
  loading: boolean;
  error: string | null;
  gameId: number | null;
  turn: Player;
  currentStep: GameStep;
  playerAUsername: string;
  playerAGrid: GridCell[][];
  playerAShips: ShipType[];
  playerAGridError: string;
  playerBUsername: string;
  playerBGrid: GridCell[][];
  playerBShips: ShipType[];
  playerBGridError: string;
  ships: ShipType[];
};

const initialState: GameState = {
  loading: false,
  error: null,
  gameId: null,
  turn: Player.PlayerA,
  currentStep: GameStep.PlayerARegister,
  playerAUsername: "",
  playerAGrid: generateIntialGrid(GridLength),
  playerAShips: [],
  playerAGridError: "",
  playerBUsername: "",
  playerBGrid: generateIntialGrid(GridLength),
  playerBShips: [],
  playerBGridError: "",
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
    setPlayerShips(
      state,
      action: { payload: { player: Player; ship: ShipType } }
    ) {
      const { player, ship } = action.payload;
      const playerShipField =
        player === Player.PlayerA ? "playerAShips" : "playerBShips";
      state[playerShipField] = [...state[playerShipField], ship];
    },
    setPlayerGridError(
      state,
      action: { payload: { player: Player; message: string } }
    ) {
      const { player, message } = action.payload;
      const playerGridErrorField =
        player === Player.PlayerA ? "playerAGridError" : "playerBGridError";
      state[playerGridErrorField] = message;
    },
    setShipInPlayerGrid(
      state,
      action: {
        payload: {
          player: Player;
          ship: ShipType;
          row: number;
          column: number;
        };
      }
    ) {
      const { player, ship, row, column } = action.payload;
      const playerGrid =
        player === Player.PlayerA ? state.playerAGrid : state.playerBGrid;

      for (let i = 0; i < ship.length; i++) {
        const gridCell = playerGrid[row][column + i];
        gridCell.occupied = true;
        gridCell.shipId = ship.id;
      }
    },
    setPlayerTurn(state, action: { payload: Player }) {
      state.turn = action.payload;
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
      /** Create game */
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
      })
      /** Save ships */
      .addCase(saveShips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveShips.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveShips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to save the ships";
      });
  },
});

export const {
  setCurrentStep,
  setPlayerAUsername,
  setPlayerBUsername,
  setPlayerShips,
  setPlayerGridError,
  setShipInPlayerGrid,
  setPlayerTurn,
} = gameSlice.actions;
export default gameSlice.reducer;

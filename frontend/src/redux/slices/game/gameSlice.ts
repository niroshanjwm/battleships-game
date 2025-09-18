import { GameStep, Player } from "@/types/game";
import { Ship } from "@/types/ship";
import { createSlice } from "@reduxjs/toolkit";
import { createGame, fetchShips, saveShips } from "./gameThunk";
import { GridCell } from "@/types/grid";
import { GridLength } from "@/constants/grid";
import { generateIntialGrid } from "@/utils/grid";

type GameState = {
  loading: boolean;
  error: string | null;
  gameId: number | null;
  currentStep: GameStep;
  playerAUsername: string;
  playerAGrid: GridCell[][];
  playerAGridError: string;
  playerBUsername: string;
  playerBGrid: GridCell[][];
  playerBGridError: string;
  ships: Ship[];
};

const initialState: GameState = {
  loading: false,
  error: null,
  gameId: null,
  currentStep: GameStep.PlayerARegister,
  playerAUsername: "",
  playerAGrid: generateIntialGrid(GridLength),
  playerAGridError: "",
  playerBUsername: "",
  playerBGrid: generateIntialGrid(GridLength),
  playerBGridError: "",
  ships: [],
};

const getPlayerGrid = (state: GameState, player: Player) => {
  return player === Player.PlayerA ? state.playerAGrid : state.playerBGrid;
};

const getPlayerError = (state: GameState, player: Player) => {
  return player === Player.PlayerA ? "playerAGridError" : "playerBGridError";
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
    positionPlayerShip(
      state,
      action: {
        payload: {
          player: Player;
          ship: Ship;
          row: number;
          column: number;
        };
      }
    ) {
      const { row, column, ship, player } = action.payload;

      const playerGrid = getPlayerGrid(state, player);
      const errorField = getPlayerError(state, player);

      state[errorField] = "";

      /** Validate grid has enough space for ship */
      if (column + ship.length > 10) {
        state[
          errorField
        ] = `There is not enough space to put #${ship.id} ${ship.name}`;
        return;
      }

      /** Validate dropping ship has overlap in grid */
      for (let i = 0; i < ship.length; i++) {
        const gridCell = playerGrid[row][column + i];
        if (gridCell.occupied) {
          state[
            errorField
          ] = `Ship #${ship.id} ${ship.name} is obstruct with another ship`;
          return;
        }
      }

      /** Drop ship into the grid */
      for (let i = 0; i < ship.length; i++) {
        const gridCell = playerGrid[row][column + i];
        gridCell.occupied = true;
        gridCell.shipId = ship.id;
      }
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
  positionPlayerShip,
} = gameSlice.actions;
export default gameSlice.reducer;

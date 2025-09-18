import { RootState } from "@/redux/store";
import { get, post } from "@/services/http";
import {
  DropShipPayload,
  DropShipThunkResponse,
  FetchShipsResponse,
  SaveShipsPayload,
  SaveShipsResponse,
} from "@/types/ship";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPlayerGrid } from "@/redux/slices/ship/shipHelpers";
import {
  setCurrentStep,
  setPlayerGridError,
  setShipInPlayerGrid,
} from "@/redux/slices/game/gameSlice";
import { GameStep, Player } from "@/types/game";

export const fetchShips = createAsyncThunk("game/fetchShips", async () => {
  const response = await get<FetchShipsResponse>(`/ship`);
  return response.data.ships;
});

export const saveShips = createAsyncThunk(
  "ship/saveShips",
  async ({ gameId, player, grid }: SaveShipsPayload, { dispatch }) => {
    const response = await post<SaveShipsResponse>(`/game/ship`, {
      gameId,
      player,
      grid,
    });

    if (player === Player.PlayerA) {
      dispatch(setCurrentStep(GameStep.PlayerBShipSetup));
    } else {
      dispatch(setCurrentStep(GameStep.Play));
    }

    return response.data;
  }
);

export const dropShip = createAsyncThunk<
  DropShipThunkResponse,
  DropShipPayload,
  { state: RootState }
>(
  "ship/dropShip",
  async (
    { player, ship, row, column }: DropShipPayload,
    { getState, dispatch }
  ) => {
    const state = getState().game;

    const playerGrid = getPlayerGrid(state, player);
    dispatch(setPlayerGridError({ player, message: "" }));

    /** Check enough grid are available for the ship */
    if (column + ship.length > 10) {
      const message = `There is not enough space to put #${ship.id} ${ship.name}`;
      dispatch(setPlayerGridError({ player, message }));
      return { status: false, message };
    }

    /** Validate dropping ship has overlap in grid */
    for (let i = 0; i < ship.length; i++) {
      const gridCell = playerGrid[row][column + i];
      if (gridCell.occupied) {
        const message = `Ship #${ship.id} ${ship.name} is obstruct with another ship`;
        dispatch(setPlayerGridError({ player, message }));
        return { status: false, message };
      }
    }

    /** Drop ship into the grid */
    dispatch(setShipInPlayerGrid({ player, ship, row, column }));

    return { status: true, message: "Successfully droped" };
  }
);

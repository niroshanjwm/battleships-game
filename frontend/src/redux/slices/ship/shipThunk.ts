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
import {
  getPlayerGrid,
  shipIsFitInGrid,
  shipIsNotOverlappedInGrid,
} from "@/redux/slices/ship/shipHelpers";
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
      grid: grid.map((row) => row.map((column) => ({ shipId: column.shipId }))),
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
    const isShipFit = shipIsFitInGrid(row, column, ship);
    if (!isShipFit) {
      const message = `Can't allign ${ship.alignment}. There is not enough space to put #${ship.id} ${ship.name}`;
      dispatch(setPlayerGridError({ player, message }));
      return { status: false, message };
    }

    /** Validate dropping ship has overlap in grid */
    const isShipIsNotOverlappedInGrid = shipIsNotOverlappedInGrid(
      row,
      column,
      ship,
      playerGrid
    );

    if (isShipIsNotOverlappedInGrid) {
      const message = `Can't allign ${ship.alignment}. Ship #${ship.id} ${ship.name} is obstruct with another ship`;
      dispatch(setPlayerGridError({ player, message }));
      return { status: false, message };
    }

    /** Drop ship into the grid */
    dispatch(setShipInPlayerGrid({ player, ship, row, column }));

    return { status: true, message: "Successfully droped" };
  }
);

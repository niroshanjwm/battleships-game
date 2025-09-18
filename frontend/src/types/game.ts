import { GridCell } from "./grid";

export enum GameStep {
  PlayerARegister = "PLAYER_A_REGISTER",
  PlayerAShipSetup = "PLAYER_A_SHIP_SETUP",
  PlayerBRegister = "PLAYER_B_REGISTER",
  PlayerBShipSetup = "PLAYER_B_SHIP_SETUP",
  Play = "PLAY",
  Finished = "FINISHED",
}

export type CreateGameResponse = {
  id: number;
  playerA: string;
  playerB: string;
  createdAt: string;
};

export type CreateGamePayload = {
  playerA: string;
  playerB: string;
};

export enum Player {
  PlayerA = "PlayerA",
  PlayerB = "PlayerB",
}

export type SaveShipsPayload = {
  gameId: number | null;
  player: Player;
  grid: GridCell[][];
};

export type SaveShipsResponse = {
  success: boolean;
};

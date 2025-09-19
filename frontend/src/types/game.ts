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

export type PlayerHitPayload = {
  player: Player;
  row: number;
  column: number;
  shipId: number | null;
  gameId: number | null;
};

export type CreateGameHitResponse = {
  success: boolean;
};

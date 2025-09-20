import { Player } from "@/types/game";
import { GridCell } from "@/types/grid";

export type Ship = {
  id: number;
  name: string;
  length: number;
};

export type FetchShipsResponse = {
  ships: Ship[];
};

export type DropShipPayload = {
  player: Player;
  ship: AlignedShip;
  row: number;
  column: number;
};

export type DropShipThunkResponse = {
  status: boolean;
  message: string;
};

export type SaveShipsPayload = {
  gameId: number | null;
  player: Player;
  grid: GridCell[][];
};

export type SaveShipsResponse = {
  success: boolean;
};

export enum ShipAlignment {
  Horizontal = "HORIZONTAL",
  Vertical = "VERTICAL",
}

export type AlignedShip = Ship & {
  alignment: ShipAlignment;
};

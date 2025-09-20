import { GameState } from "@/redux/slices/game/gameSlice";
import { Player } from "@/types/game";
import { GridCell } from "@/types/grid";
import { AlignedShip, ShipAlignment } from "@/types/ship";

export const getPlayerGrid = (state: GameState, player: Player) => {
  return player === Player.PlayerA ? state.playerAGrid : state.playerBGrid;
};

export const getPlayerError = (player: Player) => {
  return player === Player.PlayerA ? "playerAGridError" : "playerBGridError";
};

export const shipIsFitInGrid = (
  row: number,
  column: number,
  ship: AlignedShip
) => {
  console.log(row, column, ship);
  if (ship.alignment === ShipAlignment.Horizontal) {
    return column + ship.length <= 10;
  }
  return row + ship.length <= 10;
};

export const shipIsNotOverlappedInGrid = (
  row: number,
  column: number,
  ship: AlignedShip,
  grid: GridCell[][]
) => {
  for (let i = 0; i < ship.length; i++) {
    const gridCell =
      ship.alignment === ShipAlignment.Horizontal
        ? grid[row][column + i]
        : grid[row + i][column];
    console.log("🚀 ~ shipIsOverlappedInGrid ~ gridCell:",  gridCell);

    if (gridCell.occupied) {
      return true;
    }
  }
  return false;
};

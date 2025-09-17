export type Ship = {
  name: string;
  length: number;
};

export type FetchShipsResponse = {
  ships: Ship[]
}
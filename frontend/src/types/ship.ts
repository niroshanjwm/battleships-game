export type Ship = {
  id: number;
  name: string;
  length: number;
};

export type FetchShipsResponse = {
  ships: Ship[];
};

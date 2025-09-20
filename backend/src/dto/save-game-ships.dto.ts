import { z } from 'zod';

export const GridCellSchema = z.object({
  shipId: z.number().nullable(),
});

export const SaveShipSchema = z.object({
  gameId: z.number().int().nonnegative('Game id is required'),
  player: z.enum(['PlayerA', 'PlayerB'], 'Either PlayerA or PlayerB'),
  grid: z
    .array(z.array(GridCellSchema).length(10))
    .length(10, { message: 'Grid must be 10x10' }),
});

export type SaveShipDto = z.infer<typeof SaveShipSchema>;

import { z } from 'zod';

export const GetSunkShipSchema = z.object({
  gameId: z.number().int().nonnegative('Game id is required'),
  player: z.enum(['PlayerA', 'PlayerB'], 'Either PlayerA or PlayerB'),
});

export type GetSunkShipDto = z.infer<typeof GetSunkShipSchema>;

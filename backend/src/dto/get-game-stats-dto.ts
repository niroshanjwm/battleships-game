import { z } from 'zod';

export const GetGameStatsSchema = z.object({
  gameId: z.preprocess(
    (value) => Number(value),
    z.number().int().nonnegative('Game id is required'),
  ),
  boardOwner: z.enum(['PlayerA', 'PlayerB'], 'Either PlayerA or PlayerB'),
});

export type GetGameStatsDto = z.infer<typeof GetGameStatsSchema>;

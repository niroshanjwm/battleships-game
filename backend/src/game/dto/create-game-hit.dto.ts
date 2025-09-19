import { z } from 'zod';

export const CreateGameHitSchema = z.object({
  player: z.enum(['PlayerA', 'PlayerB'], 'Either PlayerA or PlayerB'),
  gameId: z.number().int().nonnegative('Game id is required'),
  row: z.number().int().nonnegative('Row is required'),
  column: z.number().int().nonnegative('Column is required'),
});

export type CreateGamHitDto = z.infer<typeof CreateGameHitSchema>;

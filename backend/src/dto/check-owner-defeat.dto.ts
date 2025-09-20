import { z } from 'zod';

export const CheckOwnerDefeatSchema = z.object({
  gameId: z.number().int().nonnegative('Game id is required'),
  boardOwner: z.enum(['PlayerA', 'PlayerB'], 'Either PlayerA or PlayerB'),
});

export type CheckOwnerDefeatDto = z.infer<typeof CheckOwnerDefeatSchema>;

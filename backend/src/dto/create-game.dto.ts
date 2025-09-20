import { z } from 'zod';

export const CreateGameSchema = z.object({
  playerA: z.string().min(3, 'playerA must be at least 3 characters long'),
  playerB: z.string().min(3, 'playerB must be at least 3 characters long'),
});

export type CreateGameDto = z.infer<typeof CreateGameSchema>;

import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipelines/validation';
import { CreateGameSchema } from './dto/create-game.dto';
import { GameService } from 'src/game/game.service';
import { z } from 'zod';

@Controller('game')
export class GameController {
  constructor(private game: GameService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreateGameSchema))
    body: z.infer<typeof CreateGameSchema>,
  ) {
    return this.game.create(body);
  }
}

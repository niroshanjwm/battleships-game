import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipelines/validation';
import { CreateGameSchema } from './dto/create-game.dto';
import { GameService } from 'src/game/game.service';
import { z } from 'zod';
import { SaveShipSchema } from './dto/save-ships.dto';

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

  @Post('/ship')
  async ships(
    @Body(new ZodValidationPipe(SaveShipSchema))
    body: z.infer<typeof SaveShipSchema>,
  ) {
    await this.game.saveShips(body);
    return { status: true };
  }
}

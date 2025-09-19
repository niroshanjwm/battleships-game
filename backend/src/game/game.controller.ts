import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipelines/validation';
import { CreateGameSchema } from './dto/create-game.dto';
import { GameService } from 'src/game/game.service';
import { z } from 'zod';
import { SaveShipSchema } from './dto/save-game-ships.dto';
import { CreateGameHitSchema } from './dto/create-game-hit.dto';
import { ShipService } from 'src/ship/ship.service';

@Controller('game')
export class GameController {
  constructor(
    private game: GameService,
    private ship: ShipService,
  ) {}

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
    await this.ship.saveShips(body);
    return { status: true };
  }

  @Post('/hit')
  async hit(
    @Body(new ZodValidationPipe(CreateGameHitSchema))
    body: z.infer<typeof CreateGameHitSchema>,
  ) {
    try {
      await this.game.saveGameHits(body);

      const shukShips = await this.ship.getSunkShips({
        gameId: body.gameId,
        player: body.player,
      });

      return { status: true, shukShips };
    } catch (error) {
      const throwedError = error as Error;
      console.log(throwedError.message, throwedError.stack);
      throw new HttpException(
        'Unable to make hit. Please try again later',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

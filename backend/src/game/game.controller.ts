import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipelines/validation';
import { CreateGameSchema } from './dto/create-game.dto';
import { z } from 'zod';

@Controller('game')
export class GameController {
  @Post()
  create(
    @Body(new ZodValidationPipe(CreateGameSchema))
    body: z.infer<typeof CreateGameSchema>,
  ) {
    return {
      message: 'Success',
      body,
    };
  }
}

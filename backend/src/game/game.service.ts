import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { CreateGameHitDto } from './dto/create-game-hit.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async create(game: CreateGameDto) {
    return this.prisma.game.create({
      data: game,
    });
  }

  async saveGameHits(createGameHit: CreateGameHitDto) {
    try {
      const { player, gameId, row, column } = createGameHit;
      return this.prisma.gameBoard.update({
        where: {
          player_gameId_row_column: {
            player,
            gameId,
            row,
            column,
          },
        },
        data: {
          isHit: true,
        },
      });
    } catch (error) {
      const throwedError = error as Error;
      console.log(throwedError.message, throwedError.stack);
      throw new HttpException(
        'Unable to update game hit data. Please try again later',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

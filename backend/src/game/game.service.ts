import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from '../dto/create-game.dto';
import { CreateGameHitDto } from '../dto/create-game-hit.dto';
import { CheckOwnerDefeatDto } from 'src/dto/check-owner-defeat.dto';

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
      const { boardOwner, gameId, row, column } = createGameHit;
      return this.prisma.gameBoard.update({
        where: {
          boardOwner_gameId_row_column: {
            boardOwner,
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

  async ownerDefeat(checkOwnerDefeatDto: CheckOwnerDefeatDto) {
    const { boardOwner, gameId } = checkOwnerDefeatDto;

    const shipsInGameBoard = await this.prisma.gameBoard.findMany({
      select: {
        shipId: true,
        isHit: true,
        ship: {
          select: {
            length: true,
          },
        },
      },
      where: {
        gameId,
        boardOwner,
        NOT: { shipId: null },
      },
    });

    // If all the ships in board are hitted then owner is defeated
    return shipsInGameBoard.every((ship) => ship.isHit);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { CreateGamHitDto } from './dto/create-game-hit.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async create(game: CreateGameDto) {
    return this.prisma.game.create({
      data: game,
    });
  }

  async saveGameHits(createGameHit: CreateGamHitDto) {
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
  }
}

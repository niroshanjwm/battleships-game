import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { SaveShipDto } from './dto/save-ships.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async create(game: CreateGameDto) {
    return this.prisma.game.create({
      data: game,
    });
  }

  async saveShips(shipDetails: SaveShipDto) {
    const { gameId, player, grid } = shipDetails;

    const gridData = grid.flatMap((row, rowIndex) =>
      row.map((cell, columnIndex) => ({
        player,
        gameId,
        row: rowIndex,
        column: columnIndex,
        shipId: cell.shipId ?? undefined,
        isHit: false,
      })),
    );

    try {
      const result = await this.prisma.$transaction([
        this.prisma.gameBoard.createMany({ data: gridData }),
      ]);
      return result;
    } catch (error) {
      console.error('Failed to save ships:', error);
      throw new Error('Unable to save ship grid data. Please try again.');
    }
  }
}

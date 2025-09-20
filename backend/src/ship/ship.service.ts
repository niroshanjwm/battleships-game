/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { GetSunkShipDto } from 'src/game/dto/get-sunk-ship-dto';
import { SaveShipDto } from 'src/game/dto/save-game-ships.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShipService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.ship.findMany();
  }

  async saveShips(shipDetails: SaveShipDto) {
    const { gameId, player, grid } = shipDetails;

    const gridData = grid.flatMap((row, rowIndex) =>
      row.map((cell, columnIndex) => ({
        boardOwner: player,
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

  async getSunkShips(getSunkShipDto: GetSunkShipDto) {
    const { boardOwner, gameId } = getSunkShipDto;
    const gameShots = await this.prisma.gameBoard.findMany({
      select: {
        shipId: true,
        ship: {
          select: {
            name: true,
            length: true,
          },
        },
      },
      where: {
        gameId,
        boardOwner,
        NOT: { shipId: null },
        isHit: true,
      },
    });

    const shipHits: Record<
      number,
      {
        shipId: number;
        name: string;
        length: number;
        successfulHits: number;
        isSunk: boolean;
      }
    > = {};

    gameShots.forEach((shot) => {
      const shipId = shot.shipId as number;
      if (!shipHits[shipId]) {
        shipHits[shipId] = {
          shipId,
          name: shot.ship?.name as string,
          length: shot.ship!.length as number,
          successfulHits: 0,
          isSunk: false,
        };
      }
      shipHits[shipId].successfulHits++;
      if (shipHits[shipId].successfulHits === shipHits[shipId].length) {
        shipHits[shipId].isSunk = true;
      }
    });
    // convert to array because it easier to read
    return Object.values(shipHits);
  }
}

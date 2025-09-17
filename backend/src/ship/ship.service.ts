import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShipService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.ship.findMany();
  }
}

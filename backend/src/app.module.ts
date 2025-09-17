import { Module } from '@nestjs/common';
import { GameService } from './game/game.service';
import { ConfigModule } from '@nestjs/config';
import { GameController } from './game/game.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ShipController } from './ship/ship.controller';
import { ShipService } from './ship/ship.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [GameController, ShipController],
  providers: [GameService, ShipService],
})
export class AppModule {}

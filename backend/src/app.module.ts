import { Module } from '@nestjs/common';
import { GameService } from './game/game.service';
import { ConfigModule } from '@nestjs/config';
import { GameController } from './game/game.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class AppModule {}

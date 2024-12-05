import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GamesModule } from './games/games.module';
import { ChildrenModule } from './children/children.module';

@Module({
  imports: [GamesModule, ChildrenModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
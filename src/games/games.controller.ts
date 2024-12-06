import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game as GameModel } from '@prisma/client';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async getGames(): Promise<GameModel[]> {
    return this.gamesService.games({});
  }

  @Get(':id')
  async getGameById(@Param('id') id: string): Promise<GameModel> {
    return this.gamesService.game({ id: Number(id) });
  }

  @Post()
  async createGame(@Body() gameData: CreateGameDto): Promise<GameModel> {
    return this.gamesService.createGame(gameData);
  }

  @Put(':id')
  async updateGame(
    @Param('id') id: string,
    @Body() gameData: UpdateGameDto,
  ): Promise<GameModel> {
    return this.gamesService.updateGame({
      where: { id: Number(id) },
      data: gameData,
    });
  }

  @Delete(':id')
  async deleteGame(@Param('id') id: string): Promise<GameModel> {
    return this.gamesService.deleteGame({ id: Number(id) });
  }

  @Put(':gameId/assign/:childId')
  async assignGameToChild(
    @Param('gameId') gameId: string,
    @Param('childId') childId: string,
  ): Promise<GameModel> {
    return this.gamesService.assignGameToChild(Number(gameId), Number(childId));
  }
}

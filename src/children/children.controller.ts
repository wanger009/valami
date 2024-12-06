import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { Child as ChildModel } from '@prisma/client';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Get()
  async getChildren(): Promise<ChildModel[]> {
    return this.childrenService.children({});
  }

  @Get(':id')
  async getChildById(@Param('id') id: string): Promise<ChildModel> {
    return this.childrenService.child({ id: Number(id) });
  }

  @Post()
  async createChild(@Body() childData: CreateChildDto): Promise<ChildModel> {
    return this.childrenService.createChild(childData);
  }

  @Put(':id')
  async updateChild(
    @Param('id') id: string,
    @Body() childData: UpdateChildDto,
  ): Promise<ChildModel> {
    return this.childrenService.updateChild({
      where: { id: Number(id) },
      data: childData,
    });
  }

  @Delete(':id')
  async deleteChild(@Param('id') id: string): Promise<ChildModel> {
    return this.childrenService.deleteChild({ id: Number(id) });
  }

  @Put(':childId/games/:gameId')
  async assignGameToChild(
    @Param('childId') childId: string,
    @Param('gameId') gameId: string,
  ): Promise<ChildModel> {
    await this.childrenService.assignGameToChild(Number(childId), Number(gameId));
    return this.childrenService.child({ id: Number(childId) });
  }
}

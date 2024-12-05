import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Child, Prisma } from '@prisma/client';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

  async child(childWhereUniqueInput: Prisma.ChildWhereUniqueInput): Promise<Child | null> {
    return this.prisma.child.findUnique({
      where: childWhereUniqueInput,
      include: { games: true },
    });
  }

  async children(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChildWhereUniqueInput;
    where?: Prisma.ChildWhereInput;
    orderBy?: Prisma.ChildOrderByWithRelationInput;
  }): Promise<Child[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.child.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { games: true },
    });
  }

  async createChild(data: Prisma.ChildCreateInput): Promise<Child> {
    return this.prisma.child.create({
      data,
    });
  }

  async updateChild(params: {
    where: Prisma.ChildWhereUniqueInput;
    data: Prisma.ChildUpdateInput;
  }): Promise<Child> {
    const { where, data } = params;
    return this.prisma.child.update({
      data,
      where,
    });
  }

  async deleteChild(where: Prisma.ChildWhereUniqueInput): Promise<Child> {
    return this.prisma.child.delete({
      where,
    });
  }

  async assignGameToChild(childId: number, gameId: number): Promise<void> {
    await this.prisma.game.update({
      where: { id: gameId },
      data: { childId: childId },
    });
  }
}
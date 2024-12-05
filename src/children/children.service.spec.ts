import { Test, TestingModule } from '@nestjs/testing';
import { ChildrenService } from './children.service';
import { PrismaService } from '../prisma.service';

describe('ChildrenService', () => {
  let service: ChildrenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChildrenService, PrismaService],
    }).compile();

    service = module.get<ChildrenService>(ChildrenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a child', async () => {
    const child = await service.createChild({ name: 'John', address: '123 Street', isGood: true });
    expect(child).toBeDefined();
    expect(child.name).toBe('John');
  });
});
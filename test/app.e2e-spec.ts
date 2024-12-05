import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaService } from '../src/prisma.service';
import { join } from 'path';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    prisma = app.get<PrismaService>(PrismaService);

    // Explicitly set the view engine for the test environment
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('ejs');

    await app.init();

    // Reset database
    await prisma.child.deleteMany({});
    await prisma.game.deleteMany({});

    // Create necessary records
    await prisma.child.create({
      data: {
        id: 1,
        name: 'John',
        address: '123 Street',
        isGood: true,
      },
    });

    await prisma.game.create({
      data: {
        id: 1,
        name: 'Chess',
        material: 'wood',
        weight: 1.5,
      },
    });

    // Verify records creation
    const child = await prisma.child.findUnique({ where: { id: 1 } });
    const game = await prisma.game.findUnique({ where: { id: 1 } });

    if (!child || !game) {
      throw new Error('Required records were not created');
    }
  });

  it('/children/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/children/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', 1);
      });
  });

  it('/children/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/children/1')
      .send({ name: 'Johnny' })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('Johnny');
      });
  });

  it('/children/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/children/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', 1);
      });
  });

  it('/children/:childId/games/:gameId (PUT)', () => {
    return request(app.getHttpServer())
      .put('/children/1/games/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', 1);
      });
  });

  it('/games/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/games/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', 1);
      });
  });

  it('/games/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/games/1')
      .send({ name: 'Checkers' })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('Checkers');
      });
  });

  it('/games/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/games/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', 1);
      });
  });

  it('/games/:gameId/assign/:childId (PUT)', () => {
    return request(app.getHttpServer())
      .put('/games/1/assign/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', 1);
      });
  });
});
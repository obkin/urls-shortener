import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserUrlDto } from './../src/shrinker/dto/user-url.dto';

const testDto: UserUrlDto = {
  fullUrl: 'https://youtube.com',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/shrinker (POST)', () => {
    return request(app.getHttpServer()).post('/shrinker').send(testDto).expect(201);
  });
});

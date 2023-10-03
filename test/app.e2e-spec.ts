import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserUrlDto } from './../src/shrinker/dto/user-url.dto';

const urlHash = 'zw1ous';

const userUrl: UserUrlDto = {
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

  it('/shrinker (POST) - success', () => {
    return request(app.getHttpServer()).post('/shrinker').send(userUrl).expect(201);
  });

  it('/shrinker/:hash (GET) - success', () => {
    return request(app.getHttpServer()).get(`/shrinker/:${urlHash}`).expect(301);
  });

  afterEach(async () => {
    await app.close();
  });
});

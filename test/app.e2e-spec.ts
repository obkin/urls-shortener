import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserUrlDto } from './../src/shrinker/dto/user-url.dto';

const userUrl: UserUrlDto = {
  fullUrl: 'https://github.com/obkin',
};

const urlHash = 'zw1ous';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/shrinker (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/shrinker')
      .send(userUrl)
      .expect(201)
      .then((res: request.Response) => {
        expect(res).toBeDefined();
      });
  });

  it('/shrinker/:hash (GET) - success (redirect to correct url)', () => {
    return request(app.getHttpServer()).get(`/shrinker/:${urlHash}`).expect(301);
  });

  // it('/shrinker/:hash (GET) - fail (redirect to 404)', () => {
  //   return request(app.getHttpServer())
  //     .get(`/shrinker/:${urlHash}`)
  //     .expect(301)
  //     .expect('https://en.wikipedia.org/wiki/HTTP_404');
  // });

  afterEach(async () => {
    await app.close();
  });
});

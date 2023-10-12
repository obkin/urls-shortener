import { Test, TestingModule } from '@nestjs/testing';
import { ShrinkerController } from './shrinker.controller';
import { ShrinkerService } from './shrinker.service';
import { LoggerService } from '../logger/logger.service';
import { UserUrlDto } from './dto/user-url.dto';

const userUrl: UserUrlDto = {
  fullUrl: 'https://github.com/obkin',
};

const shrinkerServiceMockReturn = {
  fullUrl: 'https://github.com/obkin',
  shortUrl: 'zw1ous',
  clicked: 0,
  id: 1,
};

describe('ShrinkerController', () => {
  let shrinkerController: ShrinkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShrinkerController],
      providers: [
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: ShrinkerService,
          useValue: {
            createShrinker: jest.fn().mockReturnValueOnce(shrinkerServiceMockReturn),
            findFullUrl: jest.fn().mockReturnValueOnce(shrinkerServiceMockReturn),
          },
        },
      ],
    }).compile();

    shrinkerController = module.get<ShrinkerController>(ShrinkerController);
  });

  describe('createShortUrl - success', () => {
    it('should create a Shrinker Entity', async () => {
      const res = await shrinkerController.createShortUrl(userUrl);
      expect(res).toBeDefined();
    });
  });
});

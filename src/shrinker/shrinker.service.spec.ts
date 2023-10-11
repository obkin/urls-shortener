import { Test, TestingModule } from '@nestjs/testing';
import { ShrinkerService } from './shrinker.service';
import { LoggerService } from '../logger/logger.service';
import { ShrinkerRepository } from './shrinker.repository';
import { UserUrlDto } from './dto/user-url.dto';

const userUrl: UserUrlDto = {
  fullUrl: 'https://github.com/obkin',
};

const userUrlHash = 'zw1ous';

const shrinkerRepositoryMockReturn = {
  fullUrl: 'https://github.com/obkin',
  shortUrl: 'zw1ous',
  clicked: 0,
  id: 1,
};

describe('ShrinkerService', () => {
  let shrinkerService: ShrinkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShrinkerService,
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: ShrinkerRepository,
          useValue: {
            create: jest.fn().mockReturnValueOnce(shrinkerRepositoryMockReturn),
            findShortUrl: jest.fn().mockReturnValueOnce(shrinkerRepositoryMockReturn),
            findFullUrl: jest.fn().mockReturnValueOnce(shrinkerRepositoryMockReturn),
          },
        },
      ],
    }).compile();

    shrinkerService = module.get<ShrinkerService>(ShrinkerService);
  });

  it('createShrinker - success (created new shrink / shrink exists)', async () => {
    const res = await shrinkerService.createShrinker(userUrl);
    expect(res.id).toBeDefined();
  });

  it('findFullUrl - success', async () => {
    const res = await shrinkerService.findFullUrl(userUrlHash);
    expect(res.fullUrl).toBeDefined();
  });
});

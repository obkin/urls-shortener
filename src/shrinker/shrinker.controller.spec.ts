import { Test, TestingModule } from '@nestjs/testing';
import { ShrinkerController } from './shrinker.controller';
import { ShrinkerService } from './shrinker.service';
import { LoggerService } from '../logger/logger.service';

// IS NOT WORKING NEED TO BE FIXED
// IS NOT WORKING NEED TO BE FIXED
// IS NOT WORKING NEED TO BE FIXED

describe('ShrinkerController', () => {
  let shrinkerController: ShrinkerController;
  let shrinkerService: ShrinkerService;

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
            getData: jest.fn().mockResolvedValueOnce([1]),
          },
        },
      ],
    }).compile();

    shrinkerController = module.get<ShrinkerController>(ShrinkerController);
    shrinkerService = module.get<ShrinkerService>(ShrinkerService);
  });

  describe('createShortUrl', () => {
    it('should create a Shrinker Entity', async () => {});
  });
});

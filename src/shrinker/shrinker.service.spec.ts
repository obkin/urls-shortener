import { Test, TestingModule } from '@nestjs/testing';
import { ShrinkerService } from './shrinker.service';
import { UserUrlDto } from './dto/user-url.dto';
import { LoggerService } from '../logger/logger.service';
import { ShrinkerRepository } from './shrinker.repository';
import { ShrinkEntity } from '../entities/shrink.entity';

describe('ShrinkerService', () => {
  let shrinkerService: ShrinkerService;
  let loggerService: LoggerService;
  let shrinkerRepository: ShrinkerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShrinkerService,
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: ShrinkerRepository,
          useValue: {
            findFullUrl: jest.fn(),
            create: jest.fn(),
            findShortUrl: jest.fn(),
          },
        },
      ],
    }).compile();

    shrinkerService = module.get<ShrinkerService>(ShrinkerService);
    loggerService = module.get<LoggerService>(LoggerService);
    shrinkerRepository = module.get<ShrinkerRepository>(ShrinkerRepository);
  });

  describe('createShrinker', () => {
    it('should create a new shrinker if the full URL does not exist', async () => {
      const createUserUrl: UserUrlDto = {
        fullUrl: 'https://youtube.com',
      };

      jest.spyOn(shrinkerRepository, 'findFullUrl').mockResolvedValue(null);

      await shrinkerService.createShrinker(createUserUrl);

      expect(shrinkerRepository.findFullUrl).toHaveBeenCalledWith(createUserUrl.fullUrl);
      expect(shrinkerRepository.create).toHaveBeenCalledWith(createUserUrl);
      expect(loggerService.log).toHaveBeenCalledWith(
        `[AppService] new URL (${createUserUrl.fullUrl}) saved`,
      );
      expect(loggerService.error).not.toHaveBeenCalled();
    });

    it('should log an error if the fullUrl already exists', async () => {
      const createUserUrl: UserUrlDto = {
        fullUrl: 'https://youtube.com',
      };

      const existingShrinkEntity: ShrinkEntity = {
        fullUrl: 'https://youtube.com',
        shortUrl: 'fm0bk',
        clicked: 0,
        id: 1,
      };

      jest.spyOn(shrinkerRepository, 'findFullUrl').mockResolvedValue(existingShrinkEntity);

      await shrinkerService.createShrinker(createUserUrl);

      expect(shrinkerRepository.findFullUrl).toHaveBeenCalledWith(createUserUrl.fullUrl);
      expect(shrinkerRepository.create).not.toHaveBeenCalled();
      expect(loggerService.error).toHaveBeenCalledWith(
        `[AppService] such URL (${createUserUrl.fullUrl}) is already exist`,
      );
      expect(loggerService.log).not.toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

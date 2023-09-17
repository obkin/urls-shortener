import { Test, TestingModule } from '@nestjs/testing';
import { ShrinkerService } from './shrinker.service';
import { ShrinkerRepository } from './shrinker.repository';

const ShrinkerRepositoryMock = {
  create: jest.fn(),
  findShortUrl: jest.fn(),
  findFullUrl: jest.fn(),
};

describe('ShrinkerService', () => {
  let shrinkerService: ShrinkerService;
  let shrinkerRepository: ShrinkerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShrinkerService],
    })
      .overrideProvider(ShrinkerRepository)
      .useValue(ShrinkerRepositoryMock)
      .compile();

    shrinkerService = module.get<ShrinkerService>(ShrinkerService);
    shrinkerRepository = module.get<ShrinkerRepository>(ShrinkerRepository);
  });

  it('createShrinker', async () => {
    const userUrl = {
      fullUrl: 'https://youtube.com',
    };
    const res = {
      fullUrl: 'https://github.com',
      shortUrl: 'd23p7k',
      clicked: 0,
      id: 6,
    };
    jest.spyOn(ShrinkerRepositoryMock, 'create').mockImplementation(() => res);

    expect(await shrinkerService.createShrinker(userUrl)).toReturn();
  });

  it('findFullUrl', async () => {});
});

import { Test, TestingModule } from '@nestjs/testing';
import { ShrinkerRepository } from './shrinker.repository';
import { Repository } from 'typeorm';
import { HashGenerator } from '../helpers/hash-generator';
import { UserUrlDto } from './dto/user-url.dto';
import { ShrinkEntity } from '../entities/shrink.entity';

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

describe('ShrinkerRepository', () => {
  let shrinkerRepository: ShrinkerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShrinkerRepository,
        {
          provide: Repository<ShrinkEntity>,
          useValue: {
            save: jest.fn().mockReturnValueOnce(shrinkerRepositoryMockReturn),
            findOne: jest.fn().mockReturnValueOnce(shrinkerRepositoryMockReturn),
          },
        },
        {
          provide: HashGenerator,
          useValue: {
            generate: jest.fn().mockReturnValueOnce('zw1ous'),
          },
        },
      ],
    }).compile();

    shrinkerRepository = module.get<ShrinkerRepository>(ShrinkerRepository);
  });

  it('create - success', async () => {
    const res = await shrinkerRepository.create(userUrl);
    expect(res.id).toBeDefined();
  });

  //   it('findShortUrl - success', async () => {
  //     const res = await shrinkerRepository.findShortUrl(userUrlHash);
  //     expect(res.id).toBeDefined();
  //   });

  //   it('findFullUrl - success', async () => {
  //     const res = await shrinkerRepository.findFullUrl(userUrl.fullUrl);
  //     expect(res.id).toBeDefined();
  //   });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ShrinkerService } from './shrinker.service';

const ShrinkerRepositoryMock = {
  create: jest.fn(),
  findShortUrl: jest.fn(),
  findFullUrl: jest.fn(),
};

describe('ShrinkerService', () => {
  let service: ShrinkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShrinkerService],
    }).compile();

    service = module.get<ShrinkerService>(ShrinkerService);
  });

  it('createShortUrl', async () => {
    expect(service).toBeDefined();
  });

  it('findFullUrl', async () => {
    expect(service).toBeDefined();
  });
});

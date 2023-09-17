import { Test, TestingModule } from '@nestjs/testing';
import { ShrinkerController } from './shrinker.controller';
import { ShrinkerService } from './shrinker.service';

describe('ShrinkerController', () => {
  let shrinkerController: ShrinkerController;
  let shrinkerService: ShrinkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShrinkerController],
      providers: [ShrinkerService],
    }).compile();

    shrinkerController = module.get<ShrinkerController>(ShrinkerController);
    shrinkerService = module.get<ShrinkerService>(ShrinkerService);
  });

  describe('createShortUrl', () => {
    it('should create a Shrinker Entity', async () => {
      const userUrl = 'https://youtube.com';
      jest.spyOn(ShrinkerService, '')
      expect(await ShrinkerController)
    });
  });
});

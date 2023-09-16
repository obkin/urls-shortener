import { Test, TestingModule } from '@nestjs/testing';
import { ShrinkerController } from './shrinker.controller';

describe('ShrinkerController', () => {
  let controller: ShrinkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShrinkerController],
    }).compile();

    controller = module.get<ShrinkerController>(ShrinkerController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
});

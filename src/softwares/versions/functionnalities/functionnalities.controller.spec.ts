import { Test, TestingModule } from '@nestjs/testing';
import { FunctionnalitiesController } from './functionnalities.controller';
import { FunctionnalitiesService } from './functionnalities.service';

describe('FunctionnalitiesController', () => {
  let controller: FunctionnalitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FunctionnalitiesController],
      providers: [FunctionnalitiesService],
    }).compile();

    controller = module.get<FunctionnalitiesController>(FunctionnalitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

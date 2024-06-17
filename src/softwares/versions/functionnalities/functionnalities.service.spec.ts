import { Test, TestingModule } from '@nestjs/testing';
import { FunctionnalitiesService } from './functionnalities.service';

describe('FunctionnalitiesService', () => {
  let service: FunctionnalitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FunctionnalitiesService],
    }).compile();

    service = module.get<FunctionnalitiesService>(FunctionnalitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

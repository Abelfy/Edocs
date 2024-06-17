import { Test, TestingModule } from '@nestjs/testing';
import { SoftwaresController } from './softwares.controller';
import { SoftwaresService } from './softwares.service';

describe('SoftwaresController', () => {
  let controller: SoftwaresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoftwaresController],
      providers: [SoftwaresService],
    }).compile();

    controller = module.get<SoftwaresController>(SoftwaresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

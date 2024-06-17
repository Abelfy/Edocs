import { Module } from '@nestjs/common';
import { FunctionnalitiesService } from './functionnalities.service';
import { FunctionnalitiesController } from './functionnalities.controller';
import { RisksModule } from './risks/risks.module';

@Module({
  controllers: [FunctionnalitiesController],
  providers: [FunctionnalitiesService],
  imports: [RisksModule],
})
export class FunctionnalitiesModule {}

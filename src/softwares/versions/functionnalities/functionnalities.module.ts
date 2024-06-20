import { Module } from '@nestjs/common';
import { FunctionnalitiesService } from './functionnalities.service';
import { FunctionnalitiesController } from './functionnalities.controller';
import { RisksModule } from './risks/risks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Functionnality } from './entities/functionnality.entity';

@Module({
  controllers: [FunctionnalitiesController],
  providers: [FunctionnalitiesService],
  imports: [RisksModule,TypeOrmModule.forFeature([Functionnality])],
})
export class FunctionnalitiesModule {}

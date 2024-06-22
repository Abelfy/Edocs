import { Module } from '@nestjs/common';
import { RisksService } from './risks.service';
import { RisksController } from './risks.controller';
import { Risk } from './entities/risk.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Risk])],
  controllers: [RisksController],
  providers: [RisksService],
})
export class RisksModule {}

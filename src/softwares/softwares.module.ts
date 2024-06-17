import { Module } from '@nestjs/common';
import { SoftwaresService } from './softwares.service';
import { SoftwaresController } from './softwares.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Software } from './entities/software.entity';
import { VersionsModule } from './versions/versions.module';
import { FunctionnalitiesModule } from './versions/functionnalities/functionnalities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Software]), VersionsModule,FunctionnalitiesModule],
  controllers: [SoftwaresController],
  providers: [SoftwaresService],
})
export class SoftwaresModule {}

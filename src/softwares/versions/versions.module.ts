import { Module } from '@nestjs/common';
import { VersionsService } from './versions.service';
import { VersionsController } from './versions.controller';
import { FunctionnalitiesModule } from './functionnalities/functionnalities.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Version } from './entities/version.entity';
import { Tracability } from './entities/tracability.entity';

@Module({
  controllers: [VersionsController],
  providers: [VersionsService],
  imports: [TypeOrmModule.forFeature([Version,Tracability]), FunctionnalitiesModule, ItemsModule],
})
export class VersionsModule {}

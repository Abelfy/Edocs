import { Module } from '@nestjs/common';
import { JiraService } from './jira.service';
import { JiraController } from './jira.controller';
import { Version } from 'src/softwares/versions/entities/version.entity';
import { Item } from 'src/softwares/versions/items/entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Software } from 'src/softwares/entities/software.entity';
import { Functionnality } from 'src/softwares/versions/functionnalities/entities/functionnality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Version, Item, Software, Functionnality])],
  controllers: [JiraController],
  providers: [JiraService],
})
export class JiraModule {}

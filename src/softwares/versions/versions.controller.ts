import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VersionsService } from './versions.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Version } from './entities/version.entity';

@ApiTags('versions')
@Controller('')
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  @ApiOperation({ summary: 'Create a new version' })
  @ApiBody({ type: CreateVersionDto })
  @ApiConsumes('application/json')
  @Post()
  create(@Body() createVersionDto: CreateVersionDto) :Promise<Version> {
    return this.versionsService.create(createVersionDto);
  }

  @Get()
  findAll() {
    return this.versionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVersionDto: UpdateVersionDto) {
    return this.versionsService.update(+id, updateVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versionsService.remove(+id);
  }
}

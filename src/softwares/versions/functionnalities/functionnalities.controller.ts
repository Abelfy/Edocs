import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FunctionnalitiesService } from './functionnalities.service';
import { CreateFunctionnalityDto } from './dto/create-functionnality.dto';
import { UpdateFunctionnalityDto } from './dto/update-functionnality.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('functionnalities')
@Controller('')
export class FunctionnalitiesController {
  constructor(private readonly functionnalitiesService: FunctionnalitiesService) {}

  @Post()
  create(@Body() createFunctionnalityDto: CreateFunctionnalityDto) {
    return this.functionnalitiesService.create(createFunctionnalityDto);
  }

  @Get()
  findAll() {
    return this.functionnalitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.functionnalitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFunctionnalityDto: UpdateFunctionnalityDto) {
    return this.functionnalitiesService.update(+id, updateFunctionnalityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionnalitiesService.remove(+id);
  }
}

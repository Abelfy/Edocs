import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RisksService } from './risks.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('risks')
@Controller('')
export class RisksController {
  constructor(private readonly risksService: RisksService) {}

  @Post()
  create(@Body() createRiskDto: CreateRiskDto) {
    return this.risksService.create(createRiskDto);
  }

  @Get()
  findAll(@Param('versionId',ParseIntPipe) versionId: number){
    return this.risksService.findAll(versionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.risksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskDto: UpdateRiskDto) {
    return this.risksService.update(+id, updateRiskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.risksService.remove(+id);
  }
}

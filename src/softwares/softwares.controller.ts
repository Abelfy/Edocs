import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SoftwaresService } from './softwares.service';
import { CreateSoftwareDto } from './dto/create-software.dto';
import { UpdateSoftwareDto } from './dto/update-software.dto';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';

@ApiTags('softwares')
@Controller('')
export class SoftwaresController {
  constructor(private readonly softwaresService: SoftwaresService) {}

  @Post()
  create(@Body() createSoftwareDto: CreateSoftwareDto) {
    return this.softwaresService.create(createSoftwareDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.softwaresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.softwaresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSoftwareDto: UpdateSoftwareDto) {
    return this.softwaresService.update(+id, updateSoftwareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softwaresService.remove(+id);
  }
}

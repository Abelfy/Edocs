import { Injectable } from '@nestjs/common';
import { CreateSoftwareDto } from './dto/create-software.dto';
import { UpdateSoftwareDto } from './dto/update-software.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Software } from './entities/software.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class SoftwaresService {

  constructor(@InjectRepository(Software) private softwareRepository: Repository<Software>){

  }

  create(createSoftwareDto: CreateSoftwareDto) {
    return this.softwareRepository.save(createSoftwareDto);
  }

  findAll() {
    return this.softwareRepository.find({
      relations: ['versions', 'versions.functionnalities', 'versions.items', 'versions.items.units']
    });
  }

  findOne(id: number) : Promise<Software | null>{
    console.log(id);
    return this.softwareRepository.findOneBy({
        id : Equal(id)
      });
  }

  update(id: number, updateSoftwareDto: UpdateSoftwareDto) {
    return this.softwareRepository.update(id, updateSoftwareDto);
  }

  async remove(id: number) {
    await this.softwareRepository.delete(id);
  }
}

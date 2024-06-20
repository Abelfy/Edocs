import { Injectable } from '@nestjs/common';
import { CreateFunctionnalityDto } from './dto/create-functionnality.dto';
import { UpdateFunctionnalityDto } from './dto/update-functionnality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Functionnality } from './entities/functionnality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FunctionnalitiesService {
  
  constructor(@InjectRepository(Functionnality)  private functionnalityRepository: Repository<Functionnality>) {}

  create(createFunctionnalityDto: CreateFunctionnalityDto) {
    return 'This action adds a new functionnality';
  }

  findAll() {
    return this.functionnalityRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} functionnality`;
  }

  update(id: number, updateFunctionnalityDto: UpdateFunctionnalityDto) {
    return `This action updates a #${id} functionnality`;
  }

  remove(id: number) {
    return `This action removes a #${id} functionnality`;
  }
}

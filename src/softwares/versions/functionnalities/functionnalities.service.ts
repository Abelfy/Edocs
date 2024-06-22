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
    return this.functionnalityRepository.save(createFunctionnalityDto);
  }

  findAll(versionId : number) {
    return this.functionnalityRepository.find({where: {version: { id:versionId}}});
  }

  findOne(id: number) {
    return this.functionnalityRepository.findOneBy({id});
  }

  update(id: number, updateFunctionnalityDto: UpdateFunctionnalityDto) {
    return this.functionnalityRepository.update({id},updateFunctionnalityDto);
  }

  remove(id: number) {
    return this.functionnalityRepository.delete(id);
  }
}

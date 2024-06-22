import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitsService {
  constructor(@InjectRepository(Unit) private unitRepository: Repository<Unit>) { }

  create(createItemDto: CreateUnitDto) {
    return this.unitRepository.save(createItemDto);
  }

  findAll(itemId : number) {
    return this.unitRepository.find({where: {item: { id:itemId}}});
  }

  findOne(id: number) {
    return this.unitRepository.findOneBy({ id });
  }

  update(id: number, updateItemDto: UpdateUnitDto) {
    return this.unitRepository.update({ id },updateItemDto);
  }

  remove(id: number) {
    return this.remove(id);
  }
}

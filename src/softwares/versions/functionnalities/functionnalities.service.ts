import { Injectable } from '@nestjs/common';
import { CreateFunctionnalityDto } from './dto/create-functionnality.dto';
import { UpdateFunctionnalityDto } from './dto/update-functionnality.dto';

@Injectable()
export class FunctionnalitiesService {
  create(createFunctionnalityDto: CreateFunctionnalityDto) {
    return 'This action adds a new functionnality';
  }

  findAll() {
    return `This action returns all functionnalities`;
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

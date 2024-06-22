import { Injectable } from '@nestjs/common';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Risk } from './entities/risk.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RisksService {
  constructor(@InjectRepository(Risk)  private riskRepository: Repository<Risk>) {}

  create(createFunctionnalityDto: CreateRiskDto) {
    return this.riskRepository.save(createFunctionnalityDto);
  }

  findAll(versionId: number) {
    return this.riskRepository.find({ where : { version: {id: versionId}}});
  }

  findOne(id: number) {
    return this.riskRepository.findOneBy({id});
  }

  update(id: number, updateFunctionnalityDto: UpdateRiskDto) {
    return this.riskRepository.update({id},updateFunctionnalityDto);
  }

  remove(id: number) {
    return this.riskRepository.delete(id);
  }
}

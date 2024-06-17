import { Injectable } from '@nestjs/common';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from './entities/version.entity';

@Injectable()
export class VersionsService {

  constructor(@InjectRepository(Version) private versionRepository: Repository<Version>) {

  }

  create(createVersionDto: CreateVersionDto) {
    return this.versionRepository.save(createVersionDto);
  }

  findAll() {
    return this.versionRepository.find({
      relations: ['functionnalities', 'items']
    });
  }

  findOne(id: number) {
    return this.versionRepository.findOneBy({ id });
  }

  update(id: number, updateVersionDto: UpdateVersionDto) {
    return this.versionRepository.update(id, updateVersionDto);
  }

  async remove(id: number) {
    await this.versionRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {

  constructor(@InjectRepository(Item) private itemRepository: Repository<Item>) {

  }

  create(createItemDto: CreateItemDto) {
    return this.itemRepository.save(createItemDto);
  }

  findAll(versionId : number) {
    return this.itemRepository.find({where: {version: { id:versionId}}});
  }

  findOne(id: number) {
    return this.itemRepository.findOneBy({ id });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemRepository.update({ id },updateItemDto);
  }

  remove(id: number) {
    return this.remove(id);
  }
}

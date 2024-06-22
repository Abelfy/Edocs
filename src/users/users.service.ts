import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs/internal/util/NotFoundError';

@Injectable()
export class UsersService {

  logger: Logger = new Logger('UsersService');
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save({ 
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    });
    delete user.password;
    return user
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    const user = this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    const passwordIsValid = await bcrypt.compare(password,user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}

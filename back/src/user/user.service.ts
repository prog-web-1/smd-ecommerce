import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.senha = bcrypt.hashSync(createUserDto.senha, 10)
    return this.userRepository.save(createUserDto)
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneBy(options: FindOptionsWhere<User>) {
    return this.userRepository.findOneBy(options);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.senha) updateUserDto.senha = bcrypt.hashSync(updateUserDto.senha, 10)
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ILike, Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilter } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  create(createUserDto: CreateUserDto) {
    createUserDto.senha = bcrypt.hashSync(createUserDto.senha, 10);
    return super.create(createUserDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.senha)
      updateUserDto.senha = bcrypt.hashSync(updateUserDto.senha, 10);
    return super.update(id, updateUserDto);
  }

  findAll(filter: UserFilter) {
    const where = {};
    if (filter.nome) where['nome'] = ILike(`%${filter.nome}%`);
    return super.findAll(filter, {
      where,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
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

  async create(createUserDto: CreateUserDto) {
    createUserDto.senha = await bcrypt.hash(createUserDto.senha, 10);
    return await super.create(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.senha)
      updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, 10);
    return await super.update(id, updateUserDto);
  }

  findAll(filter: UserFilter) {
    const where = {} as FindOptionsWhere<User>;
    if (filter.nome) where.nome = ILike(`%${filter.nome}%`);
    return super.findAll(filter, {
      where,
    });
  }

  findOne(id: number) {
    return super.findOne(id, {
      relations: ['compras', 'compras.carrinho'],
    });
  }
}

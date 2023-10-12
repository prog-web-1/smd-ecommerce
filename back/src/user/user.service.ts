import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { BaseService } from '../base/base.service';

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
}

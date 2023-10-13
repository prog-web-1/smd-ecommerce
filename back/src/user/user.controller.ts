import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerFactory } from '../base/base.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilter, UserFindAllResponseType } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController extends ControllerFactory<
  User,
  CreateUserDto,
  UpdateUserDto,
  UserFilter,
  UserFindAllResponseType
>(User, CreateUserDto, UpdateUserDto, UserFilter, UserFindAllResponseType) {
  constructor(public readonly userService: UserService) {
    super(userService);
  }
}

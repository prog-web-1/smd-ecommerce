import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from '../auth/models/UserRole';
import { ControllerFactory } from '../base/base.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilter, UserFindAllResponseType } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

import { Get, Param, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BaseError } from '../base/base.error';

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

  @Get()
  @ApiResponse({ status: 200, type: UserFindAllResponseType })
  @ApiResponse({ status: '4XX', type: BaseError })
  @Roles(UserRole.Admin)
  findAll(@Query() filter: UserFilter) {
    return this.userService.findAll(filter);
  }

  @Get(':id')
  @Roles(UserRole.Admin)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseController } from '../base/base.controller';
import { User } from './entities/user.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseError } from '../base/base.error';
import { BaseFilter, BaseFilterResponse } from '../base/base.filter';

class UserFindAllResponseType extends BaseFilterResponse<User>(User) {}

@Controller('user')
@ApiTags('user')
export class UserController extends BaseController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post()
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 400, type: BaseError })
  create(createDto: CreateUserDto) {
    return super.create(createDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: UserFindAllResponseType })
  findAll(@Query() filter: BaseFilter) {
    return super.findAll(filter);
  }

  @Get(':id')
  findOne(id: string) {
    return super.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 400, type: BaseError })
  @ApiBody({ type: CreateUserDto })
  update(id: string, updateDto: UpdateUserDto) {
    return super.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204 })
  remove(id: string) {
    return super.remove(id);
  }
}

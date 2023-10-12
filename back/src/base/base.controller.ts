import {
  Body,
  ClassSerializerInterceptor,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseService } from './base.service';

@UseInterceptors(ClassSerializerInterceptor)
export class BaseController<
  T,
  CreateDto extends DeepPartial<T>,
  UpdateDto extends QueryDeepPartialEntity<T>,
> {
  constructor(private readonly service: BaseService<T, CreateDto, UpdateDto>) {}

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}

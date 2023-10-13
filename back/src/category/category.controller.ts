import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ControllerFactory } from '../base/base.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  CategoryFilter,
  CategoryFindAllResponseType,
} from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { BaseError } from '../base/base.error';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('category')
@ApiTags('category')
export class CategoryController extends ControllerFactory<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryFilter,
  CategoryFindAllResponseType
>(
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryFilter,
  CategoryFindAllResponseType,
) {
  constructor(protected readonly service: CategoryService) {
    super(service);
  }

  @Get()
  @ApiResponse({ status: 200, type: CategoryFindAllResponseType })
  @ApiResponse({ status: '4XX', type: BaseError })
  @IsPublic()
  findAll(@Query() filter: CategoryFilter) {
    return this.service.findAll(filter);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}

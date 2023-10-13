import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerFactory } from '../base/base.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  CategoryFilter,
  CategoryFindAllResponseType,
} from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

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
}

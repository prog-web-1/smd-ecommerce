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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseController } from '../base/base.controller';
import { Category } from './entities/category.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseError } from '../base/base.error';
import { BaseFilter, BaseFilterResponse } from '../base/base.filter';

class CategoryFindAllResponseType extends BaseFilterResponse<Category>(
  Category,
) {}

@Controller('category')
@ApiTags('category')
export class CategoryController extends BaseController<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService);
  }

  @Post()
  @ApiResponse({ status: 201, type: Category })
  @ApiResponse({ status: 400, type: BaseError })
  create(createDto: CreateCategoryDto) {
    return super.create(createDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: CategoryFindAllResponseType })
  findAll(@Query() filter: BaseFilter) {
    return super.findAll(filter);
  }

  @Get(':id')
  findOne(id: string) {
    return super.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 400, type: BaseError })
  @ApiBody({ type: CreateCategoryDto })
  update(id: string, updateDto: UpdateCategoryDto) {
    return super.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204 })
  remove(id: string) {
    return super.remove(id);
  }
}

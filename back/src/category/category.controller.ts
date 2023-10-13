import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../base/base.controller';
import { BaseError } from '../base/base.error';
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
  findAll(@Query() filter: CategoryFilter) {
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

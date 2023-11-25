import { Controller, Get, Query, Param, Post, HttpCode } from '@nestjs/common';
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
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from '../auth/models/UserRole';
import { ProductService } from '../product/product.service';
import { mock } from './mock';

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
  constructor(
    protected readonly service: CategoryService,
    protected readonly productService: ProductService,
  ) {
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

  @Post('mockar')
  @Roles(UserRole.Admin)
  @HttpCode(200)
  async mockar() {
    const categories = new Set(mock.map((p) => p.category));
    categories.forEach(async (categoryName) => {
      const category = await this.service.create({
        nome: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
      });
      const products = mock.filter((p) => p.category === categoryName);
      products.forEach(async (product) => {
        await this.productService.create({
          nome: product.title,
          preco: product.price,
          quantidade: Math.floor(Math.random() * 10) + 1,
          descricao: product.description,
          foto: product.image,
          category,
        });
      });
    });
  }
}

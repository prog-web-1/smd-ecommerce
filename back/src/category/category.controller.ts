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
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';

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
    const categoryAmount = 10;
    const product = 10;
    const response = [];
    for (let i = 0; i < categoryAmount; i++) {
      const category = new Category();
      category.nome = faker.commerce.department();
      category.products = [];
      try {
        const saved = await this.service.create(category);
        for (let j = 0; j < product; j++) {
          const product = new Product();
          product.nome = faker.commerce.productName();
          product.preco = parseFloat(faker.commerce.price({ dec: 2 }));
          product.quantidade = faker.number.int({ min: 0, max: 10 });
          product.descricao = faker.commerce.productDescription();
          product.foto = faker.image.urlLoremFlickr({
            category: 'product',
          });
          product.category = saved;
          try {
            await this.productService.create(product);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
      response.push(category);
    }
    return response;
  }
}

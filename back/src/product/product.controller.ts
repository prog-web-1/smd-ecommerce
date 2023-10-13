import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ControllerFactory } from '../base/base.controller';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ProductFilter,
  ProductFindAllResponseType,
} from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { BaseError } from '../base/base.error';

@Controller('product')
@ApiTags('product')
export class ProductController extends ControllerFactory<
  Product,
  CreateProductDto,
  UpdateProductDto,
  ProductFilter,
  ProductFindAllResponseType
>(
  Product,
  CreateProductDto,
  UpdateProductDto,
  ProductFilter,
  ProductFindAllResponseType,
) {
  constructor(protected readonly service: ProductService) {
    super(service);
  }

  @Get()
  @ApiResponse({ status: 200, type: ProductFindAllResponseType })
  @ApiResponse({ status: '4XX', type: BaseError })
  @IsPublic()
  findAll(@Query() filter: ProductFilter) {
    return this.service.findAll(filter);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}

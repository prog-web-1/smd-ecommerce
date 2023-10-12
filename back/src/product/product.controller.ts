import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
  Body,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseController } from '../base/base.controller';
import { Product } from './entities/product.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseError } from '../base/base.error';
import { BaseFilter, BaseFilterResponse } from '../base/base.filter';

class ProductFindAllResponseType extends BaseFilterResponse<Product>(Product) {}

@Controller('product')
@ApiTags('product')
export class ProductController extends BaseController<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }

  @Post()
  @ApiResponse({ status: 201, type: Product })
  @ApiResponse({ status: 400, type: BaseError })
  create(@Body() createDto: CreateProductDto) {
    return super.create(createDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: ProductFindAllResponseType })
  findAll(@Query() filter: BaseFilter) {
    return super.findAll(filter);
  }

  @Get(':id')
  findOne(id: string) {
    return super.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 400, type: BaseError })
  @ApiBody({ type: CreateProductDto })
  update(id: string, updateDto: UpdateProductDto) {
    return super.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204 })
  remove(id: string) {
    return super.remove(id);
  }
}

import {
  Body,
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
import { CreateProductDto } from './dto/create-product.dto';
import {
  ProductFilter,
  ProductFindAllResponseType,
} from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

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
  findAll(@Query() filter: ProductFilter) {
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

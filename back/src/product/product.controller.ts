import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerFactory } from '../base/base.controller';
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
}

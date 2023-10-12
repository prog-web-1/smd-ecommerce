import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends BaseService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}

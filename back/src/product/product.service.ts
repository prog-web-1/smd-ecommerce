import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilter } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

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

  findAll(filter: ProductFilter) {
    const where = {} as FindOptionsWhere<Product>;
    if (filter.nome) where.nome = ILike(`%${filter.nome}%`);
    return super.findAll(filter, {
      where,
    });
  }
}

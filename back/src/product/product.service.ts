import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsWhere,
  ILike,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';
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
    if (filter.emEstoque !== undefined)
      where.quantidade = filter.emEstoque ? MoreThan(0) : LessThan(1);
    if (filter.category) where.category = { id: filter.category };
    return super.findAll(filter, {
      where,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Product } from '../product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RelatoriosService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async produtosSemEstoque() {
    return await this.productRepository.find({
      where: {
        quantidade: 0,
      },
      relations: ['category'],
    });
  }
}

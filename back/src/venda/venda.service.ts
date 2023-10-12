import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Venda } from './entities/venda.entity';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { BaseError } from '../base/base.error';

@Injectable()
export class VendaService extends BaseService<
  Venda,
  CreateVendaDto,
  UpdateVendaDto
> {
  constructor(
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
    private readonly productService: ProductService,
  ) {
    super(vendaRepository);
  }

  async create(createDto: CreateVendaDto) {
    await this.validateCartAmounts(createDto);
    const data = await super.create(createDto);
    await this.decreaseProductAmounts(createDto);
    return this.findOne(data.id);
  }

  async validateCartAmounts(cart: CreateVendaDto) {
    const products = cart.produtos;
    const insufficient = [];
    for (const product of products) {
      const productInDb = await this.productService.findOne(product.produto.id);
      if (productInDb.quantidade - product.quantidade < 0) {
        insufficient.push(productInDb.nome);
      }
    }
    if (insufficient.length > 0) {
      const error = new BaseError();
      error.statusCode = HttpStatus.BAD_REQUEST;
      error.error = 'Insufficient amount';
      error.message = insufficient;
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async decreaseProductAmounts(cart: CreateVendaDto) {
    const products = cart.produtos;
    for (const product of products) {
      const productInDb = await this.productService.findOne(product.produto.id);
      productInDb.quantidade -= product.quantidade;
      await this.productService.update(productInDb.id, productInDb);
    }
  }
}

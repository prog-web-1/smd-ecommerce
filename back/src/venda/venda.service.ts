import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseError } from '../base/base.error';
import { BaseService } from '../base/base.service';
import { ProductService } from '../product/product.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { VendaFilter } from './dto/find-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { Venda } from './entities/venda.entity';
import { VendaStatus } from './dto/venda-status';

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

  findAll(filter: VendaFilter) {
    const where = {} as FindOptionsWhere<Venda>;
    if (filter.cliente) where.user = { nome: ILike(`%${filter.cliente}%`) };
    if (filter.status) where.status = filter.status;
    return super.findAll(filter, {
      where,
    });
  }

  async create(createDto: CreateVendaDto) {
    await this.validateCartAmounts(createDto);
    const data = await super.create(createDto);
    await this.decreaseProductAmounts(createDto);
    return this.findOne(data.id);
  }

  async validateCartAmounts(cart: CreateVendaDto) {
    const products = cart.carrinho;
    const insufficient = [];
    for (const product of products) {
      const productInDb = await this.productService.findOne(product.produto.id);
      if (productInDb.quantidade - product.quantidade < 0) {
        insufficient.push(`${productInDb.nome}:${productInDb.quantidade}`);
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
    const products = cart.carrinho;
    for (const product of products) {
      const productInDb = await this.productService.findOne(product.produto.id);
      productInDb.quantidade -= product.quantidade;
      await this.productService.update(productInDb.id, productInDb);
    }
  }

  async aprovar(id: number, status: VendaStatus) {
    return this.update(id, {
      status,
    } as UpdateVendaDto);
  }
}

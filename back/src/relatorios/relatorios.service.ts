import { Injectable } from '@nestjs/common';
import { Product } from '../product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from '../venda/entities/venda.entity';

@Injectable()
export class RelatoriosService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
  ) {}

  async produtosSemEstoque() {
    return await this.productRepository.find({
      where: {
        quantidade: 0,
      },
      relations: ['category'],
    });
  }

  async topUsuarioVendas(dataInicial: Date, dataFinal: Date) {
    if (isNaN(dataInicial?.getTime()))
      dataInicial = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
      );
    if (isNaN(dataFinal?.getTime()))
      dataFinal = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      );
    console.log(dataInicial, dataFinal);
    return await this.vendaRepository
      .createQueryBuilder('venda')
      .select('user.id', 'id')
      .addSelect('user.nome', 'nome')
      .addSelect('COUNT(venda.id)', 'compras')
      .innerJoin('venda.user', 'user')
      .where('venda.data_hora BETWEEN :dataInicial AND :dataFinal', {
        dataInicial,
        dataFinal,
      })
      .groupBy('user.id')
      .orderBy('compras', 'DESC')
      .getRawMany();
  }
}

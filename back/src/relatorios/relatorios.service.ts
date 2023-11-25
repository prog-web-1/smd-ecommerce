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
      .where('venda.status = :status', { status: 'confirmado' })
      .groupBy('user.id')
      .orderBy('compras', 'DESC')
      .getRawMany();
  }

  async totalRecebidoDia(dataInicial: Date, dataFinal: Date) {
    const selectCommand =
      process.env.DATABASE_TYPE === 'postgres'
        ? "to_char(venda.data_hora, 'dd/MM/yyyy')"
        : "DATE_FORMAT(venda.data_hora, '%d/%m/%Y')";
    return await this.vendaRepository
      .createQueryBuilder('venda')
      .select(selectCommand, 'data')
      .addSelect('SUM(venda.valor_total)', 'total')
      .where('venda.data_hora BETWEEN :dataInicial AND :dataFinal', {
        dataInicial,
        dataFinal,
      })
      .where('venda.status = :status', { status: 'confirmado' })
      .groupBy('data')
      .orderBy('data', 'ASC')
      .getRawMany();
  }
}

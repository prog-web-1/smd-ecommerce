import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Venda } from './venda.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ColumnNumericTransformer } from '../../utils/columnFloatTransformer';

@Entity({ name: 'venda_produto' })
export class VendaProduto {
  @PrimaryColumn()
  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  vendaId: number;

  @PrimaryColumn()
  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  produtoId: number;

  @Column()
  quantidade: number;

  @ManyToOne(() => Venda, (venda) => venda.carrinho, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  venda: Venda;

  @ManyToOne(() => Product, (produto) => produto.vendas, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  produto: Product;

  @Column('decimal', {
    precision: 6,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  valor: number;
}

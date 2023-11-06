import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Venda } from './venda.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

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

  @Expose()
  @ApiProperty({ type: Number })
  get valor(): number {
    return this.quantidade * this.produto.preco;
  }
}

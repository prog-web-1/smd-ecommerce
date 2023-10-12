import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Venda } from './venda.entity';

@Entity({ name: 'venda_produto' })
export class VendaProduto {
  @PrimaryColumn()
  vendaId: number;

  @PrimaryColumn()
  produtoId: number;

  @Column()
  quantidade: number;

  @ManyToOne(() => Venda, (venda) => venda.produtos, {
    nullable: false,
  })
  venda: Venda;

  @ManyToOne(() => Product, (produto) => produto.vendas, {
    eager: true,
    nullable: false,
  })
  produto: Product;
}

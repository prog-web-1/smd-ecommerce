import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { VendaProduto } from '../../venda/entities/venda-produto.entity';
import { ColumnNumericTransformer } from '../../utils/columnFloatTransformer';

@Entity({ name: 'produto' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column()
  descricao: string;
  @Column('decimal', {
    precision: 6,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  preco: number;
  @Column({
    length: 10485760,
  })
  foto: string;
  @Column()
  quantidade: number;
  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
    nullable: false,
  })
  category: Category;
  @OneToMany(() => VendaProduto, (vendaProduto) => vendaProduto.produto)
  vendas: VendaProduto[];
}

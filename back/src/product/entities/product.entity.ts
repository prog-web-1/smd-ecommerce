import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { VendaProduto } from '../../venda/entities/venda-produto.entity';

@Entity({ name: 'produto' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column()
  descricao: string;
  @Column()
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

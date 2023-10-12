import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

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
  @Column()
  foto: string;
  @Column()
  quantidade: number;
  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
    nullable: false,
  })
  category: Category;
}

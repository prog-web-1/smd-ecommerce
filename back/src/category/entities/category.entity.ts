import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity({ name: 'categoria' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  nome: string;
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

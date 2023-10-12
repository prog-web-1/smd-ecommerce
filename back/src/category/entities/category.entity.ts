import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categoria' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
}

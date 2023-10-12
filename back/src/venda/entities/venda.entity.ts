import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'venda' })
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  data_hora: Date;
  @ManyToOne(() => User, (user) => user.vendas, {
    eager: true,
    nullable: false,
  })
  user: User;
}

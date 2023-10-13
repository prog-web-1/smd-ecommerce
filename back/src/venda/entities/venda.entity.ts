import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { VendaProduto } from './venda-produto.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'venda' })
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  data_hora: Date;
  @ManyToOne(() => User, (user) => user.compras, {
    eager: true,
    nullable: false,
  })
  user: User;
  @OneToMany(() => VendaProduto, (vendaProduto) => vendaProduto.venda, {
    eager: true,
    cascade: true,
  })
  carrinho: VendaProduto[];

  @Expose()
  @ApiProperty({ type: Number })
  get valorTotal(): number {
    return this.carrinho.reduce((acc, item) => acc + item.valor, 0);
  }
}

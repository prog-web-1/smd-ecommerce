import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  login: string;

  @Column()
  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  senha: string;

  @Column()
  endereco: string;

  @Column()
  email: string;

  @Column({ default: false })
  administrador: boolean;
}

import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({name: "usuario"})
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({unique: true})
  login: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  senha: string;

  @Column()
  endereco: string;

  @Column()
  email: string;

  @Column({ default: false })
  administrador: boolean;

}
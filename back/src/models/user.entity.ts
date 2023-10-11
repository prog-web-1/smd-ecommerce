import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "usuario"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  login: string;

  @Column()
  senha: string;

  @Column()
  endereco: string;

  @Column()
  email: string;

  @Column({ default: false })
  administrador: boolean;

}
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nome: string;
  @IsString()
  login: string;
  @IsString()
  senha: string;
  @IsString()
  endereco: string;
  @IsEmail()
  email: string;
  @IsBoolean()
  administrador: boolean = false;
}

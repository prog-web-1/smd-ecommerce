import { IsString } from 'class-validator';

export class LoginRequestBody {
  @IsString()
  login: string;
  @IsString()
  senha: string;
}
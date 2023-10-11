import { IsString, IsEmail, MinLength } from "class-validator";
import { isUnique } from "src/validators/unique";

export class CreateUserDto {
    @IsString()
    nome: string;
    @IsString()
    @isUnique({tableName: 'usuario', column: 'login'})
    login: string;
    @IsString()
    senha: string;
    @IsString()
    endereco: string;
    @IsEmail()
    email: string;
}

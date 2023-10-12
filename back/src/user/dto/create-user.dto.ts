import { IsString, IsEmail, MinLength, IsBoolean } from "class-validator";
import { isUnique } from "../../validators/unique";

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
    @IsBoolean()
    administrador: boolean = false;
}

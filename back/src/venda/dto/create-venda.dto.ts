import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { CreateVendaUserDto } from './create-venda-user.dto';
import { CreateVendaProdutoDto } from './create-venda-produto.dto';

export class CreateVendaDto {
  @ValidateNested()
  @Type(() => CreateVendaUserDto)
  @IsNotEmptyObject()
  user: User;

  @ValidateNested({ each: true })
  @Type(() => CreateVendaProdutoDto)
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  carrinho: CreateVendaProdutoDto[];
}

import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { CreateVendaProdutoDto } from './create-venda-produto.dto';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateCompraDto {
  @ApiHideProperty()
  user: User;

  @ValidateNested({ each: true })
  @Type(() => CreateVendaProdutoDto)
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  carrinho: CreateVendaProdutoDto[];
}

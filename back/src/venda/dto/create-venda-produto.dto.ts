import {
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Product } from '../../product/entities/product.entity';
import { Type } from 'class-transformer';

export class CreateVendaProdutoDto {
  @IsNumber()
  @IsPositive()
  quantidade: number;
  @ValidateNested()
  @Type(() => ProdutoDto)
  @IsNotEmptyObject()
  produto: Product;
}

class ProdutoDto {
  @IsNumber()
  id: number;
}

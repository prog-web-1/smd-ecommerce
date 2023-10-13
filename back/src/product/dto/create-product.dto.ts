import {
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Category } from '../../category/entities/category.entity';
import { Type } from 'class-transformer';
import { CreateProductCategoryDto } from './create-product-category.dto';

export class CreateProductDto {
  @IsString()
  nome: string;
  @IsString()
  descricao: string;
  @IsNumber()
  preco: number;
  @IsString()
  foto: string;
  @IsNumber()
  @IsPositive()
  quantidade: number;
  @ValidateNested()
  @Type(() => CreateProductCategoryDto)
  @IsNotEmptyObject()
  category: Category;
}

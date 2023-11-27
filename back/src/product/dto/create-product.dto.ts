import {
  IsNotEmptyObject,
  IsNumber,
  IsString,
  Min,
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
  @Min(0)
  quantidade: number;
  @ValidateNested()
  @Type(() => CreateProductCategoryDto)
  @IsNotEmptyObject()
  category: Category;
}

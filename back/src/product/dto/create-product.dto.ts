import { IsNumber, IsString, ValidateNested } from 'class-validator';
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
  quantidade: number;
  @ValidateNested()
  @Type(() => CreateProductCategoryDto)
  category: Category;
}
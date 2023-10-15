import { IsNumber } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNumber()
  id: number;
}

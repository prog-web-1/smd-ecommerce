import { IsNumber } from 'class-validator';
import { isExists } from '../../validators/exists';

export class CreateProductCategoryDto {
  @IsNumber()
  @isExists({ tableName: 'categoria', column: 'id' })
  id: number;
}

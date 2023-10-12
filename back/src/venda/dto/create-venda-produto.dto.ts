import { IsNotEmptyObject, IsNumber, ValidateNested } from 'class-validator';
import { isExists } from '../../validators/exists';
import { Product } from '../../product/entities/product.entity';
import { Type } from 'class-transformer';

export class CreateVendaProdutoDto {
  @IsNumber()
  quantidade: number;
  @ValidateNested()
  @Type(() => ProdutoDto)
  @IsNotEmptyObject()
  produto: Product;
}

class ProdutoDto {
  @IsNumber()
  @isExists({ tableName: 'produto', column: 'id' })
  id: number;
}

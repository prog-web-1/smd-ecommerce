import { IsOptional, IsString } from 'class-validator';
import { BaseFilter, BaseFilterResponse } from '../../base/base.filter';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class ProductFindAllResponseType extends BaseFilterResponse<Product>(
  Product,
) {}

export class ProductFilter extends BaseFilter {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public nome: string;
}

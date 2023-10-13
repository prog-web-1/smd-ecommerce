import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { BaseFilter, BaseFilterResponse } from '../../base/base.filter';
import { Product } from '../entities/product.entity';

export class ProductFindAllResponseType extends BaseFilterResponse<Product>(
  Product,
) {}

export class ProductFilter extends BaseFilter {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public nome: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @ApiProperty({ required: false, type: Boolean })
  public emEstoque: boolean;
}

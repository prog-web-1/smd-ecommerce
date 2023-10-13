import { IsOptional, IsString } from 'class-validator';
import { BaseFilter, BaseFilterResponse } from '../../base/base.filter';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CategoryFindAllResponseType extends BaseFilterResponse<Category>(
  Category,
) {}

export class CategoryFilter extends BaseFilter {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public nome: string;
}

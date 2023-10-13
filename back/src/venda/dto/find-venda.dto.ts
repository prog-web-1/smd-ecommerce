import { IsOptional, IsString } from 'class-validator';
import { BaseFilter, BaseFilterResponse } from '../../base/base.filter';
import { Venda } from '../entities/venda.entity';
import { ApiProperty } from '@nestjs/swagger';

export class VendaFindAllResponseType extends BaseFilterResponse<Venda>(
  Venda,
) {}

export class VendaFilter extends BaseFilter {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public cliente: string;
}

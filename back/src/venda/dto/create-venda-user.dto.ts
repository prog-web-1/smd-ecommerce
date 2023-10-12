import { IsNumber } from 'class-validator';
import { isExists } from '../../validators/exists';

export class CreateVendaUserDto {
  @IsNumber()
  @isExists({ tableName: 'usuario', column: 'id' })
  id: number;
}

import { Type } from 'class-transformer';
import { IsDate, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { CreateVendaUserDto } from './create-venda-user.dto';

export class CreateVendaDto {
  @IsDate()
  data_hora: Date = new Date();
  @ValidateNested()
  @Type(() => CreateVendaUserDto)
  @IsNotEmptyObject()
  user: User;
}

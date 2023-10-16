import { IsNumber } from 'class-validator';

export class CreateVendaUserDto {
  @IsNumber()
  id: number;
}

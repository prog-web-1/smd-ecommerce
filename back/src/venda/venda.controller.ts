import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerFactory } from '../base/base.controller';
import { CreateVendaDto } from './dto/create-venda.dto';
import { VendaFilter, VendaFindAllResponseType } from './dto/find-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { Venda } from './entities/venda.entity';
import { VendaService } from './venda.service';

@Controller('venda')
@ApiTags('venda')
export class VendaController extends ControllerFactory<
  Venda,
  CreateVendaDto,
  UpdateVendaDto,
  VendaFilter,
  VendaFindAllResponseType
>(
  Venda,
  CreateVendaDto,
  UpdateVendaDto,
  VendaFilter,
  VendaFindAllResponseType,
) {
  constructor(protected readonly service: VendaService) {
    super(service);
  }
}

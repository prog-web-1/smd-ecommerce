import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../base/base.controller';
import { BaseError } from '../base/base.error';
import { CreateVendaDto } from './dto/create-venda.dto';
import { VendaFilter, VendaFindAllResponseType } from './dto/find-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { Venda } from './entities/venda.entity';
import { VendaService } from './venda.service';

@Controller('venda')
@ApiTags('venda')
export class VendaController extends BaseController<
  Venda,
  CreateVendaDto,
  UpdateVendaDto
> {
  constructor(private readonly vendaService: VendaService) {
    super(vendaService);
  }

  @Post()
  @ApiResponse({ status: 201, type: Venda })
  @ApiResponse({ status: 400, type: BaseError })
  create(createDto: CreateVendaDto) {
    return super.create(createDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: VendaFindAllResponseType })
  findAll(@Query() filter: VendaFilter) {
    return super.findAll(filter);
  }

  @Get(':id')
  findOne(id: string) {
    return super.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 400, type: BaseError })
  @ApiBody({ type: CreateVendaDto })
  update(id: string, updateDto: UpdateVendaDto) {
    return super.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204 })
  remove(id: string) {
    return super.remove(id);
  }
}

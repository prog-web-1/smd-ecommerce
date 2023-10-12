import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { BaseController } from '../base/base.controller';
import { Venda } from './entities/venda.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseError } from '../base/base.error';

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
  findAll() {
    return super.findAll();
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

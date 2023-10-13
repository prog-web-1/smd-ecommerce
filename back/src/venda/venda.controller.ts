import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ControllerFactory } from '../base/base.controller';
import { CreateVendaDto } from './dto/create-venda.dto';
import { VendaFilter, VendaFindAllResponseType } from './dto/find-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { Venda } from './entities/venda.entity';
import { VendaService } from './venda.service';
import { BaseError } from '../base/base.error';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from '../auth/models/UserRole';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateCompraDto } from './dto/compra-compra.dto';

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

  @Post('comprar')
  @ApiResponse({ status: 201, type: Venda })
  @ApiResponse({ status: '4XX', type: BaseError })
  @ApiBody({ type: CreateCompraDto })
  @ApiBearerAuth()
  @Roles(UserRole.User)
  comprar(@Body() createDto: CreateCompraDto, @CurrentUser() user: User) {
    createDto.user = user;
    return this.service.create(createDto);
  }

  @Post('validarCarrinho')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: '4XX', type: BaseError })
  @ApiBody({ type: CreateCompraDto })
  async validarCarrinho(@Body() createDto: CreateCompraDto) {
    await this.service.validateCartAmounts(createDto);
  }
}

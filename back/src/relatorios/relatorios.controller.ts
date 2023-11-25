import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RelatoriosService } from './relatorios.service';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from '../auth/models/UserRole';

function inicioMes() {
  const hoje = new Date();
  return new Date(hoje.getFullYear(), hoje.getMonth(), 1);
}

function fimMes() {
  const hoje = new Date();
  return new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
}

@Controller('relatorios')
@ApiTags('relatorios')
export class RelatoriosController {
  constructor(protected readonly service: RelatoriosService) {}

  @Get('/produtos-sem-estoque')
  @Roles(UserRole.Admin)
  async produtosSemEstoque() {
    return await this.service.produtosSemEstoque();
  }

  @Get('/top-usuario-vendas')
  @Roles(UserRole.Admin)
  async topUsuarioVendas(
    @Query('dataInicial') dataInicial: string,
    @Query('dataFinal') dataFinal: string,
  ) {
    return await this.service.topUsuarioVendas(
      dataInicial ? new Date(dataInicial) : inicioMes(),
      dataFinal ? new Date(dataFinal) : fimMes(),
    );
  }

  @Get('/total-recebido-dia')
  @Roles(UserRole.Admin)
  async totalRecebidoDia(
    @Query('dataInicial') dataInicial: string,
    @Query('dataFinal') dataFinal: string,
  ) {
    return await this.service.totalRecebidoDia(
      dataInicial ? new Date(dataInicial) : inicioMes(),
      dataFinal ? new Date(dataFinal) : fimMes(),
    );
  }
}

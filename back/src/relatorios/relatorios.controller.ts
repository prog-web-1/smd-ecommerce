import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RelatoriosService } from './relatorios.service';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from '../auth/models/UserRole';

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
      new Date(dataInicial),
      new Date(dataFinal),
    );
  }
}

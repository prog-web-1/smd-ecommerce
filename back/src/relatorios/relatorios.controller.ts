import { Controller, Get } from '@nestjs/common';
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
}

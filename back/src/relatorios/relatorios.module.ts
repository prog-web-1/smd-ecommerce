import { Module } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { RelatoriosController } from './relatorios.controller';
import { Product } from '../product/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from '../venda/entities/venda.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Venda]),
  ],
  exports: [RelatoriosService],
  controllers: [RelatoriosController],
  providers: [RelatoriosService],
})
export class RelatoriosModule {}

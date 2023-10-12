import { Module } from '@nestjs/common';
import { VendaService } from './venda.service';
import { VendaController } from './venda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venda])],
  exports: [VendaService],
  controllers: [VendaController],
  providers: [VendaService],
})
export class VendaModule {}

import { Module } from '@nestjs/common';
import { VendaService } from './venda.service';
import { VendaController } from './venda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { ProductModule } from '../product/product.module';
import { VendaSubscriber } from './subscribers/venda.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Venda]), ProductModule],
  exports: [VendaService],
  controllers: [VendaController],
  providers: [VendaService, VendaSubscriber],
})
export class VendaModule {}

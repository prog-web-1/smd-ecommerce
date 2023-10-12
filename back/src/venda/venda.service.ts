import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Venda } from './entities/venda.entity';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VendaService extends BaseService<
  Venda,
  CreateVendaDto,
  UpdateVendaDto
> {
  constructor(
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
  ) {
    super(vendaRepository);
  }

  create(createDto: CreateVendaDto) {
    console.log(createDto);
    return super.create(createDto);
  }
}

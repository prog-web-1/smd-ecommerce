import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Connection,
} from 'typeorm';
import { Venda } from '../entities/venda.entity';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Product } from '../../product/entities/product.entity';

@EventSubscriber()
@Injectable()
export class VendaSubscriber implements EntitySubscriberInterface<Venda> {
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Venda;
  }

  async beforeInsert(event: InsertEvent<Venda>) {
    event.entity.valorTotal = 0;
    await Promise.all(
      event.entity.carrinho.map(async (item) => {
        const produto = await event.manager.findOne(Product, {
          where: { id: item.produto.id },
        });
        item.valor = produto.preco * item.quantidade;
        event.entity.valorTotal += item.valor;
      }),
    );
  }
}

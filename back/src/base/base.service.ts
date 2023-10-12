import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseService<T, CreateDto extends DeepPartial<T>, UpdateDto extends QueryDeepPartialEntity<T>> {
  constructor( 
    private repository: Repository<T>,
  ) {}

  create(createDto: CreateDto) {
    return this.repository.save(createDto)
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneById(id)
  }

  findOneBy(options: FindOptionsWhere<T>) {
    return this.repository.findOneBy(options);
  }

  update(id: number, updateDto: UpdateDto) {
    return this.repository.update(id, updateDto)
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}

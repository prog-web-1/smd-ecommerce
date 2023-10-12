import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async findOne(id: number) {
    const obj = await this.repository.findOneById(id)
    if (!obj) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return obj
  }

  findOneBy(options: FindOptionsWhere<T>) {
    return this.repository.findOneBy(options);
  }

  async update(id: number, updateDto: UpdateDto) {
    await this.repository.update(id, updateDto)
    return this.findOne(id)
  }

  async remove(id: number) {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return result
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsWhere,
  ILike,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';
import { BaseService } from '../base/base.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryFilter } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService extends BaseService<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  findAll(filter: CategoryFilter) {
    const where = {} as FindOptionsWhere<Category>;
    if (filter.nome) where.nome = ILike(`%${filter.nome}%`);
    if (filter.emEstoque !== undefined)
      where.products = {
        quantidade: filter.emEstoque ? MoreThan(0) : LessThan(1),
      };
    return super.findAll(filter, {
      relations: ['products'],
      where,
    });
  }
}

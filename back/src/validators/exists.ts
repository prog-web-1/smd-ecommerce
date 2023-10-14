import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { EntityManager } from 'typeorm';

// decorator options interface
export type IsExistInterface = {
  tableName: string;
  column: string;
};

@ValidatorConstraint({ name: 'IsExistsConstraint', async: true })
@Injectable()
export class IsExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    // catch options from decorator
    const { tableName, column }: IsExistInterface = args.constraints[0];

    // database query check data is exists
    const dataExist = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists();

    return dataExist;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    // return custom field message
    const field: string = validationArguments.property;
    return `Este ${field} não existe.`;
  }
}

// decorator function
export function isExists(
  options: IsExistInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsExistsConstraint,
    });
  };
}

import { Injectable } from '@nestjs/common';
import { CreateProductCommand } from './commands/create-product.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductsQuery } from './queries/get-products.query';

@Injectable()
export class ProductsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ){}

  create(createProductCommand: CreateProductCommand) {
    return this.commandBus.execute(createProductCommand);
  }

   findAll() {
      return this.queryBus.execute(new GetProductsQuery()); // 👈
    };
  

  // findOne(id: number) {
  //   //implement queryBus
  //   return `This action returns a #${id} product`;
  // }


}

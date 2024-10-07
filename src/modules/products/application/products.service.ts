import { Injectable } from '@nestjs/common';
import { CreateProductCommand } from './commands/create-product.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductsQuery } from './queries/get-products.query';
import { GetProductsByIdQuery } from './queries/get-products-by-id.query';

@Injectable()
export class ProductsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createProductCommand: CreateProductCommand) {
    return this.commandBus.execute(createProductCommand);
  }

  findAll() {
    return this.queryBus.execute(new GetProductsQuery());
  }

  findOne(id: string) {
    // console.log(id)
    return this.queryBus.execute(new GetProductsByIdQuery(id));
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}

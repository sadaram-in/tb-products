import { Injectable } from '@nestjs/common';
import { CreateProductCommand } from './commands/create-product.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductsQuery } from './queries/get-products.query';
import { GetProductsByIdQuery } from './queries/get-products-by-id.query';
import { UpdateProductCommand } from './commands/update-product.command';
import { DeleteProductCommand } from './commands/delete-product.command';

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

  async update(id: string, updateProductCommand: UpdateProductCommand) {
    // First, check if the product exists
    const product = await this.queryBus.execute(new GetProductsByIdQuery(id));

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return await this.commandBus.execute(updateProductCommand);
  }

  async remove(id: string) {
    // console.log("----------bp1----------")
    const product = await this.queryBus.execute(new GetProductsByIdQuery(id));
    // console.log("----------bp1----------2")

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    // console.log("----------bp1---------3-")
    return await this.commandBus.execute(new DeleteProductCommand(id));
    // console.log("----------bp1----------4")
  }
}

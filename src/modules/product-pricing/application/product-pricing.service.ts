import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductPricingQuery } from './queries/get-product-pricing.query';
import { GetProductPricingByIdQuery } from './queries/get-product-pricing-by-id.query';
import { CreateProductPricingCommand } from './commands/create-product-pricing.command';
import { UpdateProductPricingCommand } from './commands/update-product-pricing.command';
import { DeleteProductPricingCommand } from './commands/delete-product-pricing.command';

@Injectable()
export class ProductPricingService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createProductPricingCommand: CreateProductPricingCommand) {
    // console.log('post request is made ', createProductPricingCommand);
    return this.commandBus.execute(createProductPricingCommand);
  }

  findAll() {
    console.log('post request is made ');
    return this.queryBus.execute(new GetProductPricingQuery());
  }

  findOne(id: string) {
    return this.queryBus.execute(new GetProductPricingByIdQuery(id));
  }

  async update(
    id: string,
    updateProductPricingCommand: UpdateProductPricingCommand,
  ) {
    const pricing = await this.queryBus.execute(
      new GetProductPricingByIdQuery(id),
    );

    if (!pricing) {
      throw new Error(`Pricing with ID ${id} not found 💸`);
    }

    return this.commandBus.execute(updateProductPricingCommand);
  }

  async remove(id: string) {
    const pricing = await this.queryBus.execute(
      new GetProductPricingByIdQuery(id),
    );

    if (!pricing) {
      throw new Error(`Pricing with ID ${id} not found ❌`);
    }

    return this.commandBus.execute(new DeleteProductPricingCommand(id));
  }
}

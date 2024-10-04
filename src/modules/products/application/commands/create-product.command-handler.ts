import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { Logger } from '@nestjs/common';
import { ProductFactory } from '../../domain/factories/product.factory';
import { IProductRepository } from '../../domain/ports/products.repository';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  private readonly logger = new Logger(CreateProductCommandHandler.name);

  constructor(
    private readonly productRepository: IProductRepository,
    private readonly productFactory: ProductFactory,
  ) {}

  async execute(command: CreateProductCommand) {
    this.logger.debug(
      `Processing "CreateProductCommand": ${JSON.stringify(command)}`,
    );
    const product = this.productFactory.create(command.name);
    return this.productRepository.save(product);
  }
}
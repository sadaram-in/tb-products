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
      `Processing "CreateProductCommand" with data: ${JSON.stringify(command)}`,
    );

    // Use the factory to create a product entity from the command data
    const product = this.productFactory.create({
      golden_id: command.golden_id,
      name: command.name,
      description: command.description,
      change_log: command.change_log,
      effective_from: command.effective_from,
      effective_to: command.effective_to,
      is_active: command.is_active,
    });

    // Save the product entity using the repository
    return this.productRepository.save(product);
  }
}

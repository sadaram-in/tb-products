import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductTermFactory } from '../../domain/factories/product-term.factory';
import { IProductTermRepository } from '../../domain/ports/product-term.repository';
import { CreateProductTermCommand } from './create-product-term.command';

@CommandHandler(CreateProductTermCommand)
export class CreateProductTermCommandHandler
  implements ICommandHandler<CreateProductTermCommand>
{
  private readonly logger = new Logger(CreateProductTermCommandHandler.name);

  constructor(
    private readonly productTermRepository: IProductTermRepository,
    private readonly productTermFactory: ProductTermFactory,
  ) {}

  async execute(command: CreateProductTermCommand) {
    this.logger.debug(
      `Processing "CreateProductTermCommand" with data: ${JSON.stringify(command)}`,
    );

    // Use the factory to create a product entity from the command data
    const productTerm = this.productTermFactory.create({
      term_type: command.term_type,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Save the product entity using the repository
    return this.productTermRepository.save(productTerm);
  }
}

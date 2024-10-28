import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { DiscountTypeFactory } from '../../domain/factories/discount-type.factory';
import { IDiscountTypeRepository } from '../../domain/ports/discount-type.repository';
import { CreateDiscountTypeCommand } from './create-discount-type.command';

@CommandHandler(CreateDiscountTypeCommand)
export class CreateDiscountTypeCommandHandler
  implements ICommandHandler<CreateDiscountTypeCommand>
{
  private readonly logger = new Logger(CreateDiscountTypeCommandHandler.name);

  constructor(
    private readonly discountTypeRepository: IDiscountTypeRepository,
    private readonly discountTypeFactory: DiscountTypeFactory,
  ) {}

  async execute(command: CreateDiscountTypeCommand) {
    this.logger.debug(
      `Processing "CreateDiscountTypeCommand" with data: ${JSON.stringify(command)}`,
    );

    // Use the factory to create a product entity from the command data
    const discountType = this.discountTypeFactory.create({
      type: command.type,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Save the product entity using the repository
    return this.discountTypeRepository.save(discountType);
  }
}

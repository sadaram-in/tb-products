import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { DiscountFactory } from '../../domain/factories/discount.factory';
import { IDiscountRepository } from '../../domain/ports/discount.repository';
import { CreateDiscountCommand } from './create-discount.command';

@CommandHandler(CreateDiscountCommand)
export class CreateDiscountCommandHandler
  implements ICommandHandler<CreateDiscountCommand>
{
  private readonly logger = new Logger(CreateDiscountCommandHandler.name);

  constructor(
    private readonly discountRepository: IDiscountRepository,
    private readonly discountFactory: DiscountFactory,
  ) {}

  async execute(command: CreateDiscountCommand) {
    this.logger.debug(
      `Processing "CreateDiscountCommand" with data: ${JSON.stringify(command)}`,
    );

    // Use the factory to create a product entity from the command data
    const discount = this.discountFactory.create({
      discount_type: command.discount_type,
      percentage: command.percentage,
      start_date: command.start_date,
      end_date: command.end_date,
    });

    // Save the product entity using the repository
    return this.discountRepository.save(discount);
  }
}

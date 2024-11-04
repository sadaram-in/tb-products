import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductPricingCommand } from './create-product-pricing.command';
import { Logger } from '@nestjs/common';
import { ProductPricingFactory } from '../../domain/factories/product-pricing.factory';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';

@CommandHandler(CreateProductPricingCommand)
export class CreateProductPricingCommandHandler
  implements ICommandHandler<CreateProductPricingCommand>
{
  private readonly logger = new Logger(CreateProductPricingCommandHandler.name);

  constructor(
    private readonly productPricingRepository: IProductPricingRepository,
    private readonly productPricingFactory: ProductPricingFactory,
  ) {}

  async execute(command: CreateProductPricingCommand) {
    this.logger.debug(
      `Processing CreateProductPricingCommand with data: ${JSON.stringify(command)}`,
    );

    // console.log(command);
    if (!command.product_id) {
      return { message: 'Product ID is required.' };
    }
    const productPricing = this.productPricingFactory.create({
      product_id: command.product_id,
      price: command.price,
      currency: command.currency,
      is_active: command.is_active,
      start_date: command.start_date,
      end_date: command.end_date,
      eol_date: command.eol_date,
      term_id: command.term_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.productPricingRepository.save(productPricing);
  }
}

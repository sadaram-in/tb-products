import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductPricingCommand } from './create-product-pricing.command';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';
import { ProductPricingFactory } from '../../domain/factories/product-pricing.factory';
import { Inject, Logger } from '@nestjs/common';

@CommandHandler(CreateProductPricingCommand)
export class CreateProductPricingCommandHandler
  implements ICommandHandler<CreateProductPricingCommand>
{
  private readonly logger = new Logger(CreateProductPricingCommandHandler.name);

  constructor(
    @Inject('IProductPricingRepository')
    private readonly productPricingRepository: IProductPricingRepository,
    private readonly productPricingFactory: ProductPricingFactory,
  ) {}

  async execute(command: CreateProductPricingCommand) {
    this.logger.debug(
      `Processing CreateProductPricingCommand with data: ${JSON.stringify(command)}`,
    );

    const productPricing = this.productPricingFactory.create({
      productId: command.productId,
      price: command.price,
      currency: command.currency,
      isActive: command.isActive,
      effectiveFrom: command.effectiveFrom,
      effectiveTo: command.effectiveTo,
    });

    return this.productPricingRepository.save(productPricing);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductPricingCommand } from './update-product-pricing.command';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';
import { ProductPricing } from '../../domain/product-pricing';
import { Inject, Logger } from '@nestjs/common';

@CommandHandler(UpdateProductPricingCommand)
export class UpdateProductPricingCommandHandler
  implements ICommandHandler<UpdateProductPricingCommand>
{
  private readonly logger = new Logger(UpdateProductPricingCommandHandler.name);

  constructor(
    @Inject('IProductPricingRepository')
    private readonly productPricingRepository: IProductPricingRepository,
  ) {}

  async execute(command: UpdateProductPricingCommand) {
    this.logger.debug(
      `Processing UpdateProductPricingCommand with data: ${JSON.stringify(command)}`,
    );

    let existingPricing = await this.productPricingRepository.findOne(
      command.id,
    );

    if (!existingPricing) {
      throw new Error(`ProductPricing with ID ${command.id} not found`);
    }

    existingPricing = new ProductPricing(
      command.id,
      existingPricing.product_id,
      command.price || existingPricing.price,
      command.currency || existingPricing.currency,
      command.isActive || existingPricing.is_active,
      command.effectiveFrom || existingPricing.effective_from,
      command.effectiveTo || existingPricing.effective_to,
    );

    return this.productPricingRepository.save(existingPricing);
  }
}

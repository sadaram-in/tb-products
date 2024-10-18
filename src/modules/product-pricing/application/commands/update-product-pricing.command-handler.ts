import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductPricingCommand } from './update-product-pricing.command';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';
import { ProductPricing } from '../../domain/product-pricing';
import { randomUUID } from 'crypto';
import { ProductPricingFactory } from '../../domain/factories/product-pricing.factory';

@CommandHandler(UpdateProductPricingCommand)
export class UpdateProductPricingCommandHandler
  implements ICommandHandler<UpdateProductPricingCommand>
{
  constructor(
    private readonly productPricingRepository: IProductPricingRepository,
    private readonly productPricingFactory: ProductPricingFactory,
  ) {}

  async execute(command: UpdateProductPricingCommand): Promise<ProductPricing> {
    const {
      id,
      price,
      currency,
      start_date,
      end_date,
      is_active,
      eol_date,
      term,
    } = command;

    // Logic to update the product using the repository
    const previousProductPricing =
      await this.productPricingRepository.findOne(id);
    if (!previousProductPricing) {
      throw new Error(`Product with ID ${id} not found`);
    }
    // console.log(is_active);
    // Update the product properties
    const productPricing = this.productPricingFactory.create({
      product_id: previousProductPricing.product_id,
      price,
      currency,
      start_date,
      end_date,
      is_active,
      eol_date,
      term,
    });
    await this.productPricingRepository.save(productPricing);

    previousProductPricing.end_date = new Date(
      new Date(start_date).getTime() - 1 * 24 * 60 * 60 * 1000,
    );
    // console.log(productToUpdate);
    // Save the updated product
    return await this.productPricingRepository.save(previousProductPricing);
  }
}

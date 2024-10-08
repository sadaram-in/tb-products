import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';
import { ProductPricing } from '../../domain/product-pricing';
import { UpdateProductPricingCommand } from './update-product-pricing.command';
import { Inject } from '@nestjs/common';

@CommandHandler(UpdateProductPricingCommand)
export class UpdateProductPricingCommandHandler
  implements ICommandHandler<UpdateProductPricingCommand>
{
  constructor(
    @Inject('IProductPricingRepository')
    private readonly productPricingRepository: IProductPricingRepository,
  ) {}

  async execute(command: UpdateProductPricingCommand): Promise<ProductPricing> {
    const { id, price, currency, effective_from, effective_to, is_active } =
      command;

    // Logic to update the product using the repository
    const productToUpdate = await this.productPricingRepository.findOne(id);
    if (!productToUpdate) {
      throw new Error(`Product with ID ${id} not found`);
    }
    // console.log(is_active);
    // Update the product properties
    productToUpdate.price = price;
    productToUpdate.currency = currency;
    productToUpdate.effective_from = effective_from;
    productToUpdate.effective_to = effective_to;
    productToUpdate.is_active = is_active;
    // console.log(productToUpdate);
    // Save the updated product
    return await this.productPricingRepository.save(productToUpdate);
  }
}

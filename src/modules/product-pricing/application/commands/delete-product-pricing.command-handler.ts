import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductPricingRepository } from '../../infrastructure/persistance/orm/repositories/product-pricing.repository';
import { DeleteProductPricingCommand } from './delete-product-pricing.command';
import { Inject } from '@nestjs/common';

@CommandHandler(DeleteProductPricingCommand)
export class DeleteProductPricingCommandHandler
  implements ICommandHandler<DeleteProductPricingCommand>
{
  constructor(
    @Inject('IProductPricingRepository')
    private readonly productPricingRepository: ProductPricingRepository,
  ) {}

  async execute(command: DeleteProductPricingCommand) {
    const { id } = command;

    const pricing = await this.productPricingRepository.findOne(id);
    if (!pricing) throw new Error(`Product pricing with ID ${id} not found`);

    await this.productPricingRepository.delete(id);
  }
}

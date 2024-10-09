
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductPricingCommand } from './delete-product-pricing.command';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';

@CommandHandler(DeleteProductPricingCommand)
export class DeleteProductPricingCommandHandler
  implements ICommandHandler<DeleteProductPricingCommand>
{
  constructor(
    private readonly productPricingRepository: IProductPricingRepository,
  ) {}

  async execute(command: DeleteProductPricingCommand): Promise<void> {
    await this.productPricingRepository.delete(command.id);
  }
}

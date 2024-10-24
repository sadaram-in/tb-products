import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteDiscountCommand } from './delete-discount.command';
import { IDiscountRepository } from '../../domain/ports/discount.repository';

@CommandHandler(DeleteDiscountCommand)
export class DeleteDiscountCommandHandler
  implements ICommandHandler<DeleteDiscountCommand>
{
  constructor(private readonly discountRepository: IDiscountRepository) {}

  async execute(command: DeleteDiscountCommand) {
    const { id } = command;
    await this.discountRepository.delete(id);
    return { message: `Discount with ID ${id} deleted successfully` };
  }
}

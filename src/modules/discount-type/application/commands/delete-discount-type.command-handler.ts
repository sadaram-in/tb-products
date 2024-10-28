import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteDiscountTypeCommand } from './delete-discount-type.command';
import { IDiscountTypeRepository } from '../../domain/ports/discount-type.repository';

@CommandHandler(DeleteDiscountTypeCommand)
export class DeleteDiscountTypeCommandHandler
  implements ICommandHandler<DeleteDiscountTypeCommand>
{
  constructor(private readonly discountTypeRepository: IDiscountTypeRepository) {}

  async execute(command: DeleteDiscountTypeCommand) {
    const { id } = command;
    await this.discountTypeRepository.delete(id);
    return { message: `Discount type with ID ${id} deleted successfully` };
  }
}

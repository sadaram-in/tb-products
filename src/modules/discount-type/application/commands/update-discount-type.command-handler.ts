import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDiscountTypeCommand } from './update-discount-type.command';
import { IDiscountTypeRepository } from '../../domain/ports/discount-type.repository'; // Adjust the import path
import { DiscountType } from '../../domain/discount-type'; // Adjust the import path

@CommandHandler(UpdateDiscountTypeCommand)
export class UpdateDiscountTypeCommandHandler
  implements ICommandHandler<UpdateDiscountTypeCommand>
{
  constructor(
    private readonly discountTypeRepository: IDiscountTypeRepository,
  ) {}

  async execute(command: UpdateDiscountTypeCommand): Promise<DiscountType> {
    const { id, type } = command;

    // Logic to update the product using the repository
    const discountTypeToUpdate = await this.discountTypeRepository.findOne(id);
    if (!discountTypeToUpdate) {
      throw new Error(`Discount type with ID ${id} not found`);
    }
    // Update the product properties
    discountTypeToUpdate.type = type ? type : discountTypeToUpdate.type;
    discountTypeToUpdate.updated_at = new Date();
    // Save the updated product
    return await this.discountTypeRepository.save(discountTypeToUpdate);
  }
}

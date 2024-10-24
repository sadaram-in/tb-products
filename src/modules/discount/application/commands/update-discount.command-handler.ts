import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDiscountCommand } from './update-discount.command';
import { IDiscountRepository } from '../../domain/ports/discount.repository'; // Adjust the import path
import { Discount } from '../../domain/discount'; // Adjust the import path

@CommandHandler(UpdateDiscountCommand)
export class UpdateDiscountCommandHandler
  implements ICommandHandler<UpdateDiscountCommand>
{
  constructor(private readonly discountRepository: IDiscountRepository) {}

  async execute(command: UpdateDiscountCommand): Promise<Discount> {
    const { id, percentage, discount_type, start_date, end_date } = command;

    // Logic to update the product using the repository
    const discountToUpdate = await this.discountRepository.findOne(id);
    if (!discountToUpdate) {
      throw new Error(`Discount with ID ${id} not found`);
    }
    // console.log(is_active);
    // Update the product properties
    discountToUpdate.percentage = percentage
      ? percentage
      : discountToUpdate.percentage;
    discountToUpdate.discount_type = discount_type
      ? discount_type
      : discountToUpdate.discount_type;
    discountToUpdate.start_date = start_date
      ? start_date
      : discountToUpdate.start_date;
    discountToUpdate.end_date = end_date ? end_date : discountToUpdate.end_date;
    // console.log(discountToUpdate);
    // Save the updated product
    return await this.discountRepository.save(discountToUpdate);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductTermCommand } from './update-product-term.command';
import { IProductTermRepository } from '../../domain/ports/product-term.repository';
import { ProductTerm } from '../../domain/product-term'; 

@CommandHandler(UpdateProductTermCommand)
export class UpdateProductTermCommandHandler
  implements ICommandHandler<UpdateProductTermCommand>
{
  constructor(
    private readonly productTermRepository: IProductTermRepository,
  ) {}

  async execute(command: UpdateProductTermCommand): Promise<ProductTerm> {
    const { id, term_type } = command;

    // Logic to update the product using the repository
    const productTermToUpdate = await this.productTermRepository.findOne(id);
    if (!productTermToUpdate) {
      throw new Error(`Product term with ID ${id} not found`);
    }
    // Update the product properties
    productTermToUpdate.term_type = term_type ? term_type : productTermToUpdate.term_type;
    productTermToUpdate.updated_at = new Date();
    // Save the updated product
    return await this.productTermRepository.save(productTermToUpdate);
  }
}

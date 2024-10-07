import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from './update-product.command'; // Adjust the import path
import { IProductRepository } from '../../domain/ports/products.repository'; // Adjust the import path
import { Product } from '../../domain/product'; // Adjust the import path

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(command: UpdateProductCommand): Promise<Product> {
    const {
      id,
      name,
      description,
      changeLog,
      effective_from,
      effective_to,
      is_active,
    } = command;

    // Logic to update the product using the repository
    const productToUpdate = await this.productRepository.findOne(id);
    if (!productToUpdate) {
      throw new Error(`Product with ID ${id} not found`);
    }
    // console.log(is_active);
    // Update the product properties
    productToUpdate.name = name;
    productToUpdate.description = description;
    productToUpdate.changeLog = changeLog;
    productToUpdate.effective_from = effective_from;
    productToUpdate.effective_to = effective_to;
    productToUpdate.is_active = is_active;
    // console.log(productToUpdate);
    // Save the updated product
    return await this.productRepository.save(productToUpdate);
  }
}

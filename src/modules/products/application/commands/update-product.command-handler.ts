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
      change_log,
      start_date,
      end_date,
      is_active,
      golden_id,
    } = command;

    // Logic to update the product using the repository
    const productToUpdate = await this.productRepository.findOne(id);
    if (!productToUpdate) {
      throw new Error(`Product with ID ${id} not found`);
    }
    // console.log(is_active);
    // Update the product properties
    productToUpdate.golden_id = golden_id;
    productToUpdate.name = name;
    productToUpdate.description = description;
    productToUpdate.change_log = change_log;
    productToUpdate.start_date = start_date;
    productToUpdate.end_date = end_date;
    productToUpdate.is_active = is_active;
    // console.log(productToUpdate);
    // Save the updated product
    return await this.productRepository.save(productToUpdate);
  }
}

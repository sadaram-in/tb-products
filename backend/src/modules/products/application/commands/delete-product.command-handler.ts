import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from './delete-product.command';
import { IProductRepository } from '../../domain/ports/products.repository';

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(command: DeleteProductCommand) {
    const { id } = command;
    await this.productRepository.delete(id);
    return { message: `Product with ID ${id} deleted successfully` };
  }
}

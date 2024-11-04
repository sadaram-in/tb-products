import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductTermCommand } from './delete-product-term.command';
import { IProductTermRepository } from '../../domain/ports/product-term.repository';

@CommandHandler(DeleteProductTermCommand)
export class DeleteProductTermCommandHandler
  implements ICommandHandler<DeleteProductTermCommand>
{
  constructor(
    private readonly productTermRepository: IProductTermRepository,
  ) {}

  async execute(command: DeleteProductTermCommand) {
    const { id } = command;
    await this.productTermRepository.delete(id);
    return { message: `Product term with ID ${id} deleted successfully` };
  }
}

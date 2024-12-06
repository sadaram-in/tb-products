import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ProductRepositoryPort } from '../ports/product.repository.port';
import { DeleteProductCommand } from './delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler {
  constructor(
    @Inject('ProductRepositoryPort')
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(command: DeleteProductCommand) {
    await this.productRepository.delete(command.id);
  }
}

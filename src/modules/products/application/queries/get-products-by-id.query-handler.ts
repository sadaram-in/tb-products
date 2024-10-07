import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Product } from '../../domain/product';
import { GetProductsByIdQuery } from './get-products-by-id.query';
import { IProductRepository } from '../../domain/ports/products.repository';

@QueryHandler(GetProductsByIdQuery)
export class GetProductsByIdQueryHandler
  implements IQueryHandler<GetProductsByIdQuery, Product>
{
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(query: GetProductsByIdQuery): Promise<Product> {
    // console.log("-------- Fetching product with ID ---------", query.id);
    const product = await this.productRepository.findOne(query.id);

    if (!product) {
      throw new Error(`Product with ID ${query.id} not found`);
    }
    return product;
  }
}

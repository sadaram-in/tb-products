import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductTerm } from '../../domain/product-term';
import { GetProductTermByIdQuery } from './get-product-term-by-id.query';
import { IProductTermRepository } from '../../domain/ports/product-term.repository';

@QueryHandler(GetProductTermByIdQuery)
export class GetProductTermByIdQueryHandler
  implements IQueryHandler<GetProductTermByIdQuery, ProductTerm>
{
  constructor(private readonly productTermRepository: IProductTermRepository) {}

  async execute(query: GetProductTermByIdQuery): Promise<ProductTerm> {
    try {
      const productTerm = await this.productTermRepository.findOne(query.id);
      console.log(productTerm);
      if (!productTerm) {
        return null;
      }
      return productTerm;
    } catch (error) {
      return null;
    }
  }
}

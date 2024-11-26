import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductTerm } from '../../domain/product-term';
import { GetProductTermQuery } from './get-product-term.query';
import { IProductTermRepository } from '../../domain/ports/product-term.repository';

@QueryHandler(GetProductTermQuery)
export class GetProductTermQueryHandler
  implements IQueryHandler<GetProductTermQuery, ProductTerm[]>
{
  constructor(private readonly productTermRepository: IProductTermRepository) {}

  async execute(query: GetProductTermQuery): Promise<ProductTerm[]> {
    return this.productTermRepository.findAll();
  }
}

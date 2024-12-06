import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProductRepositoryPort } from '../../application/ports/product.repository.port';
import { GetProductsQuery, GetValidProductsQuery } from './get-products.query';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    @Inject('ProductRepositoryPort')
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(query: GetProductsQuery) {
    return this.productRepository.findAll();
  }
}

@QueryHandler(GetValidProductsQuery)
export class GetValidProductsHandler
  implements IQueryHandler<GetValidProductsQuery>
{
  constructor(
    @Inject('ProductRepositoryPort')
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(query: GetValidProductsQuery) {
    return this.productRepository.findValidProducts(query.date);
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductPricingByIdQuery } from './get-product-pricing-by-id.query';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';
import { Inject, Logger } from '@nestjs/common';

@QueryHandler(GetProductPricingByIdQuery)
export class GetProductPricingByIdQueryHandler
  implements IQueryHandler<GetProductPricingByIdQuery> {
  
  private readonly logger = new Logger(GetProductPricingByIdQueryHandler.name);

  constructor(
    @Inject('IProductPricingRepository')
    private readonly productPricingRepository: IProductPricingRepository,
  ) {}

  async execute(query: GetProductPricingByIdQuery) {
    this.logger.debug(`Fetching ProductPricing with ID: ${query.id}`);
    return this.productPricingRepository.findOne(query.id);
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';
import { Logger } from '@nestjs/common';
import { GetProductPricingQuery } from './get-product-pricing.query';

@QueryHandler(GetProductPricingQuery)
export class GetProductPricingsQueryHandler
  implements IQueryHandler<GetProductPricingQuery>
{
  private readonly logger = new Logger(GetProductPricingsQueryHandler.name);

  constructor(
    private readonly productPricingRepository: IProductPricingRepository,
  ) {}

  async execute(query: GetProductPricingQuery) {
    this.logger.debug(`Fetching all ProductPricings`);
    return this.productPricingRepository.findAll();
  }
}

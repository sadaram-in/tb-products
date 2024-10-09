import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductPricingByIdQuery } from './get-product-pricing-by-id.query';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';
import { ProductPricing } from '../../domain/product-pricing';

@QueryHandler(GetProductPricingByIdQuery)
export class GetProductPricingByIdQueryHandler
  implements IQueryHandler<GetProductPricingByIdQuery>
{
  constructor(
    private readonly productPricingRepository: IProductPricingRepository,
  ) {}
  async execute(query: GetProductPricingByIdQuery): Promise<ProductPricing> {
    const productPricing = await this.productPricingRepository.findOne(
      query.id,
    );

    if (!productPricing) {
      throw new Error(`Product pricing with ID ${query.id} not found`);
    }

    return productPricing;
  }
}

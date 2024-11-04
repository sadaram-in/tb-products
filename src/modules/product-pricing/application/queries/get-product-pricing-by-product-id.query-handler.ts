import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductPricingByProductIdQuery } from './get-product-pricing-by-product-id.query';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';
import { ProductPricing } from '../../domain/product-pricing';

@QueryHandler(GetProductPricingByProductIdQuery)
export class GetProductPricingByProductIdQueryHandler
  implements IQueryHandler<GetProductPricingByProductIdQuery>
{
  constructor(
    private readonly productPricingRepository: IProductPricingRepository,
  ) {}
  async execute(
    query: GetProductPricingByProductIdQuery,
  ): Promise<ProductPricing> {
    const productPricing = await this.productPricingRepository.findOne(
      query.product_id,
      query.startDate,
    );

    if (!productPricing) {
      throw new Error(
        `Product pricing with of product with ID ${query.product_id} not found`,
      );
    }

    return productPricing;
  }
}

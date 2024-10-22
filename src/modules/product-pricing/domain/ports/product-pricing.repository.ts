import { ProductPricing } from '../product-pricing';

export abstract class IProductPricingRepository {
  abstract findAll(): Promise<ProductPricing[]>;
  abstract findOne(
    product_id: string,
    startDate: Date,
  ): Promise<ProductPricing>;
  abstract findOneById(id: string): Promise<ProductPricing>;
  abstract save(productPricing: ProductPricing): Promise<ProductPricing>;
  abstract delete(id: string): Promise<void>;
  abstract updateIsActive(currentDate: Date): Promise<void>;
  abstract findByCommand(
    product_id: string,
    check_start_date: Date,
    check_end_date: Date,
    order: boolean,
  ): Promise<ProductPricing[]>;
}

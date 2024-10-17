import { ProductPricing } from '../product-pricing';

export abstract class IProductPricingRepository {
  abstract findAll(): Promise<ProductPricing[]>;
  abstract findOne(id: string): Promise<ProductPricing>;
  abstract save(productPricing: ProductPricing): Promise<ProductPricing>;
  abstract delete(id: string): Promise<void>;
  abstract updateIsActive(currentDate: Date): Promise<void>;
}

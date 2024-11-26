import { ProductPricingEntity } from '../../infrastructure/persistance/orm/entities/product-pricing.entities';
import { CreateProductPricingDto } from '../../presentation/http/dto/create-product-pricing.dto';

export class ProductPricingFactory {
  create(
    createProductPricingDto: CreateProductPricingDto,
  ): ProductPricingEntity {
    const {
      product_id,
      price,
      currency,
      is_active,
      start_date,
      end_date,
      eol_date,
      term_id,
    } = createProductPricingDto;

    const productPricing = new ProductPricingEntity();
    productPricing.product_id = product_id;
    productPricing.price = price;
    productPricing.currency = currency;
    productPricing.is_active = is_active;
    productPricing.start_date = start_date;
    productPricing.end_date = end_date;
    productPricing.eol_date = eol_date;
    productPricing.term_id = term_id;

    return productPricing;
  }
}

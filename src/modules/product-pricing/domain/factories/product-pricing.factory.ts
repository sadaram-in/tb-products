import { ProductPricingEntity } from "../../infrastructure/persistance/orm/entities/product-pricing.entities"; 
import { CreateProductPricingDto } from "../../presentation/http/dto/create-product-pricing.dto";

export class ProductPricingFactory {
  create(createProductPricingDto: CreateProductPricingDto): ProductPricingEntity {
    const { product_id, price, currency, is_active, effective_from, effective_to, eol_date, term } = createProductPricingDto;

    const productPricing = new ProductPricingEntity();
    productPricing.product_id = product_id;
    productPricing.price = price;
    productPricing.currency = currency;
    productPricing.is_active = is_active;
    productPricing.effective_from = effective_from;
    productPricing.effective_to = effective_to;
    productPricing.eol_date = eol_date;
    productPricing.term = term;

    return productPricing;
  }
}

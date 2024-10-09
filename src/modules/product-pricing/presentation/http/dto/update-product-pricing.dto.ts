import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPricingDto } from './create-product-pricing.dto';

export class UpdateProductPricingDto extends PartialType(
  CreateProductPricingDto,
) {
  price?: number;
  currency?: string;
  is_active?: boolean;
  effective_from?: Date;
  effective_to: Date | null;
}

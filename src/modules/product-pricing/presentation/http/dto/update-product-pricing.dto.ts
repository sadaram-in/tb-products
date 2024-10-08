import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPricingDto } from './create-product-pricing.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductPricingDto extends PartialType(
  CreateProductPricingDto,
) {
  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ required: false })
  currency?: string;

  @ApiProperty({ required: false })
  is_active?: boolean;

  @ApiProperty({ required: false })
  effective_from?: Date;

  @ApiProperty({ required: false })
  effective_to: Date | null;
}

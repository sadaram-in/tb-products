import { ApiProperty } from '@nestjs/swagger';

export class CreateProductPricingDto {
  @ApiProperty()
  product_id: string;
  price: number;
  currency: string;
  is_active: boolean;
  effective_from: Date;
  effective_to: Date | null;
}

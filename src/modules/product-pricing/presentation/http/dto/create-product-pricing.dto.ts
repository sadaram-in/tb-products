import { ApiProperty } from '@nestjs/swagger';

export class CreateProductPricingDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  effective_from: Date;

  @ApiProperty({ required: false })
  effective_to: Date | null;
}

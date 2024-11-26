import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUUID } from 'class-validator';

export class GetProductPricingDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID of the product'
  })
  product_id: string;

  @ApiProperty({
    example: '2024-03-20T00:00:00Z',
    description: 'Start date for the pricing query'
  })
  @IsDateString()
  start_date: Date;
}

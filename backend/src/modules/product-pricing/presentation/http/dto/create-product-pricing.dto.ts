import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

export class CreateProductPricingDto extends BaseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID of the product'
  })
  @IsUUID()
  product_id: string;

  @ApiProperty({
    example: 99.99,
    description: 'Price of the product'
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'USD',
    description: 'Currency code (e.g., USD, EUR, GBP)'
  })
  @IsString()
  currency: string;

  @ApiProperty({
    example: true,
    description: 'Whether the pricing is currently active'
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: '2024-03-20T00:00:00Z',
    description: 'Start date of the pricing'
  })
  @IsDateString()
  start_date: Date;

  @ApiProperty({
    example: '2024-12-31T23:59:59Z',
    description: 'End date of the pricing (optional)',
    nullable: true
  })
  @IsOptional()
  @IsDateString()
  end_date: Date | null;

  @ApiProperty({
    example: '2025-12-31T23:59:59Z',
    description: 'End of life date (optional, must be after end_date)',
    nullable: true
  })
  @IsOptional()
  @IsDateString()
  @ValidateIf((o) => o.eol_date >= o.end_date)
  eol_date: Date | null;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID of the term (optional)',
    nullable: true
  })
  @IsOptional()
  @IsUUID()
  term_id: string;
}

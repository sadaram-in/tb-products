import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPricingDto } from './create-product-pricing.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdateProductPricingDto extends PartialType(
  CreateProductPricingDto,
) {
  @ApiPropertyOptional({
    example: 99.99,
    description: 'Price of the product'
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    example: 'USD',
    description: 'Currency code (e.g., USD, EUR, GBP)'
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the pricing is currently active'
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({
    example: '2024-03-20T00:00:00Z',
    description: 'Start date of the pricing'
  })
  @IsOptional()
  @IsDateString()
  start_date?: Date;

  @ApiPropertyOptional({
    example: '2024-12-31T23:59:59Z',
    description: 'End date of the pricing',
    nullable: true
  })
  @IsOptional()
  @IsDateString()
  end_date?: Date | null;

  @ApiPropertyOptional({
    example: '2025-12-31T23:59:59Z',
    description: 'End of life date (must be after end_date)',
    nullable: true
  })
  @IsOptional()
  @IsDateString()
  @ValidateIf((o) => o.eol_date >= o.end_date)
  eol_date?: Date | null;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID of the term',
    nullable: true
  })
  @IsOptional()
  @IsUUID()
  term_id?: string;
}

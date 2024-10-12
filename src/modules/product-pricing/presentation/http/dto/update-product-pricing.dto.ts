import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPricingDto } from './create-product-pricing.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductPricingDto extends PartialType(
  CreateProductPricingDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  effective_from?: Date;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsDateString()
  effective_to?: Date | null;
}

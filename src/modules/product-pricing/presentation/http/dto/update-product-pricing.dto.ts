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
  ValidateIf,
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
  start_date?: Date;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsDateString()
  end_date?: Date | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsDateString()
  @ValidateIf((o) => o.eol_date >= o.end_date)
  eol_date?: Date | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  term?: string | null;
}

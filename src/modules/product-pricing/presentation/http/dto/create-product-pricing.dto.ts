import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductPricingDto {
  @ApiProperty()
  @IsUUID()
  product_id: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty()
  @IsDateString()
  effective_from: Date;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsDateString()
  effective_to: Date | null;
}

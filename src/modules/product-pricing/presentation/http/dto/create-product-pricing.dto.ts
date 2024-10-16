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

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsDateString()
  @ValidateIf((o) => o.eol_date >= o.effective_to)
  eol_date: Date | null;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  term: string | null;
}

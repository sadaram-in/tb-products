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
  start_date: Date;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsDateString()
  end_date: Date | null;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsDateString()
  @ValidateIf((o) => o.eol_date >= o.end_date)
  eol_date: Date | null;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  term: string | null;
}

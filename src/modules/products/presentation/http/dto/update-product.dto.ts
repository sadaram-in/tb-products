import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
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
  @IsDate()
  end_date?: Date | null;

  @ApiProperty()
  @IsDate()
  updated_at: Date;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    example: true,
    description: 'Whether the product is currently active'
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({
    example: '2024-03-20T00:00:00Z',
    description: 'Date when the product becomes available'
  })
  @IsOptional()
  @IsDateString()
  start_date?: Date;

  @ApiPropertyOptional({
    example: '2024-12-31T23:59:59Z',
    description: 'Date when the product expires',
    nullable: true
  })
  @IsOptional()
  @IsDate()
  end_date?: Date | null;

  @ApiProperty({
    example: '2024-03-20T12:00:00Z',
    description: 'Last update timestamp'
  })
  @IsDate()
  updated_at: Date;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductTermDto } from './create-product-term.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { ProductTermType } from 'src/shared/constants/product-term-types';

export class UpdateProductTermDto extends PartialType(CreateProductTermDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ProductTermType)
  term_type?: ProductTermType;
}

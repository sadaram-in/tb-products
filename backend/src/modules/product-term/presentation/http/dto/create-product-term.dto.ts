import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ProductTermType } from 'src/shared/constants/product-term-types';
import { BaseDto } from 'src/shared/dto/base.dto';

export class CreateProductTermDto extends BaseDto {
  @ApiProperty({
    example: 'MONTHLY',
    description: 'Type of product term (e.g., MONTHLY, YEARLY, ONE_TIME)',
    enum: ProductTermType
  })
  @IsEnum(ProductTermType)
  term_type: ProductTermType;
}

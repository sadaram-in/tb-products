import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscountTypeDto } from './create-discount-type.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDiscountTypeDto extends PartialType(CreateDiscountTypeDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: string;
}

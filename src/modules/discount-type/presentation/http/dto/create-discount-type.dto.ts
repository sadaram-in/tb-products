import { ApiProperty } from '@nestjs/swagger';
import {  IsString, Length } from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

export class CreateDiscountTypeDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @Length(1, 30)
  type: string;
}

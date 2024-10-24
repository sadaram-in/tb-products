import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty()
  @IsString()
  @Length(1, 30)
  discount_type: string;

  @ApiProperty()
  @IsNumber()
  percentage: number;

  @ApiProperty()
  @IsDateString()
  start_date: Date;

  @ApiProperty()
  @IsDateString()
  end_date: Date;
}

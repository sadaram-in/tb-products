import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { BaseDto } from 'src/shared/dto/base-dto';

export class CreateDiscountDto extends BaseDto {
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

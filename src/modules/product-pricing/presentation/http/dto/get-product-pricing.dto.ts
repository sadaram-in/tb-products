import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUUID } from 'class-validator';

export class GetProductPricingDto {
  @ApiProperty()
  product_id: string;

  @ApiProperty()
  @IsDateString()
  start_date: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class BaseDto {
  @ApiProperty()
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  updated_at: Date;
}


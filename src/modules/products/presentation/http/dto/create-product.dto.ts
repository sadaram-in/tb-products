import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsArray,
  isArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @Length(1, 30)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(1, 255)
  description: string;

  @ApiProperty()
  @IsArray()
  change_log: Record<string, any>;

  @ApiProperty()
  @IsDateString()
  effective_from: Date;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsDateString()
  effective_to: Date | null;

  @ApiProperty()
  @IsBoolean()
  is_active: boolean;
}

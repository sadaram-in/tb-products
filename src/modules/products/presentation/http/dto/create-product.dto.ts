import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsUUID()
  golden_id: string;

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
  start_date: Date;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsDateString()
  end_date: Date | null;

  @ApiProperty()
  @IsBoolean()
  is_active: boolean;
}

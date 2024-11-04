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
import { BaseDto } from 'src/shared/dto/base.dto';

export class CreateProductDto extends BaseDto {
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
  @IsOptional()
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

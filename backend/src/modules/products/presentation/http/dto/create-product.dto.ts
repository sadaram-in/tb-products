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
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Golden ID of the product'
  })
  @IsUUID()
  golden_id: string;

  @ApiProperty({
    example: 'Premium Plan',
    description: 'Name of the product (1-30 characters)'
  })
  @IsString()
  @Length(1, 30)
  name: string;

  @ApiProperty({
    example: 'Our premium subscription plan with advanced features',
    description: 'Detailed description of the product (1-255 characters)'
  })
  @IsString()
  @Length(1, 255)
  description: string;

  @ApiProperty({
    example: [{ date: '2024-03-20', changes: 'Initial release' }],
    description: 'Array of changes made to the product',
    required: false
  })
  @IsArray()
  @IsOptional()
  change_log: Record<string, any>;

  @ApiProperty({
    example: '2024-03-20T00:00:00Z',
    description: 'Date when the product becomes available'
  })
  @IsDateString()
  start_date: Date;

  @ApiProperty({
    example: '2024-12-31T23:59:59Z',
    description: 'Date when the product expires (optional)',
    nullable: true
  })
  @IsOptional()
  @IsDateString()
  end_date: Date | null;

  @ApiProperty({
    example: true,
    description: 'Whether the product is currently active'
  })
  @IsBoolean()
  is_active: boolean;
}

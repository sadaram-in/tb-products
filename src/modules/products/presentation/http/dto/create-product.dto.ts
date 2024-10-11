import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;
  description: string;
  change_log: Record<string, any>;
  effective_from: Date;
  effective_to: Date | null;
  is_active: boolean;
}

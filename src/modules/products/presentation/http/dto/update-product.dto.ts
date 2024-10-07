// presentation/http/dto/update-product.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  is_active?: boolean;
  effective_from?: Date;
  effective_to?: Date | null;
}

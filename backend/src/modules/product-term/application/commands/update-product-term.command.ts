// application/commands/create-product.command.ts
import { ProductTermType } from 'src/shared/constants/product-term-types';
export class UpdateProductTermCommand {
  constructor(
    public readonly id: string,
    public readonly term_type?: ProductTermType,
  ) {}
}

// application/commands/create-product.command.ts
import { ProductTermType } from 'src/shared/constants/product-term-types';

export class CreateProductTermCommand {
  constructor(public readonly term_type: ProductTermType) {}
}

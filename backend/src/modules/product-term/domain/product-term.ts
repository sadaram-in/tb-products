import { ProductTermType } from "src/shared/constants/product-term-types";

export class ProductTerm {
  constructor(
    public id: string,
    public term_type: ProductTermType,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}

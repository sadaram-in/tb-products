export class ProductPricing {
  constructor(
    public id: string,
    public product_id: string,
    public price: number,
    public currency: string,
    public is_active: boolean,
    public effective_from: Date,
    public effective_to: Date | null,
  ) {}
}

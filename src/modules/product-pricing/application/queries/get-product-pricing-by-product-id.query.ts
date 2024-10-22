export class GetProductPricingByProductIdQuery {
  constructor(
    public readonly product_id: string,
    public readonly startDate: Date,
  ) {}
}

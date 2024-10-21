export class GetProductPricingByIdQuery {
  constructor(
    public readonly product_id: string,
    public readonly startDate: Date,
  ) {}
}

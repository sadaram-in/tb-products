export class UpdateProductPricingCommand {
  constructor(
    public readonly product_id: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly start_date: Date,
    public readonly end_date: Date,
    public readonly eol_date: Date,
    public readonly term_id: string,
  ) {}
}

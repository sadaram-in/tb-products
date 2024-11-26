export class CreateProductPricingCommand {
  constructor(
    public readonly product_id: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly is_active: boolean,
    public readonly start_date: Date,
    public readonly end_date: Date | null,
    public readonly eol_date: Date | null,
    public readonly term_id: string,
  ) {}
}

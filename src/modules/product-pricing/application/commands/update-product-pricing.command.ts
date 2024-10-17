export class UpdateProductPricingCommand {
  constructor(
    public readonly id: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly is_active: boolean,
    public readonly effective_from: Date,
    public readonly effective_to: Date,
    public readonly eol_date: Date,
    public readonly term: string,
  ) {}
}

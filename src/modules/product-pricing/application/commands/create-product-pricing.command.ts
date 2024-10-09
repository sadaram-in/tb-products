export class CreateProductPricingCommand {
  constructor(
    public readonly product_id: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly is_active: boolean,
    public readonly effective_from: Date,
    public readonly effective_to: Date | null,
  ) {}
}

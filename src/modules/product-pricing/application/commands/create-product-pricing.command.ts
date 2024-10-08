export class CreateProductPricingCommand {
  constructor(
    public readonly productId: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly isActive: boolean,
    public readonly effectiveFrom: Date,
    public readonly effectiveTo: Date,
  ) {}
}

export class UpdateProductPricingCommand {
  constructor(
    public readonly id: string,
    public readonly price?: number,
    public readonly currency?: string,
    public readonly isActive?: boolean,
    public readonly effectiveFrom?: Date,
    public readonly effectiveTo?: Date,
  ) {}
}

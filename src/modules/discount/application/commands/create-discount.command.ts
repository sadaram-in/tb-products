// application/commands/create-product.command.ts

export class CreateDiscountCommand {
  constructor(
    public readonly discount_type: string,
    public readonly percentage: number,
    public readonly start_date: Date,
    public readonly end_date: Date | null,
  ) {}
}

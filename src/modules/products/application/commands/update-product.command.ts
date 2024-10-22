// application/commands/create-product.command.ts

export class UpdateProductCommand {
  constructor(
    public readonly id: string,
    public readonly golden_id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly change_log: Record<string, any>,
    public readonly start_date: Date,
    public readonly end_date: Date | null,
    public readonly is_active: boolean,
  ) {}
}

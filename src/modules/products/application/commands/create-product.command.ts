// application/commands/create-product.command.ts

export class CreateProductCommand {
  constructor(
    public readonly golden_id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly change_log: Record<string, any>,
    public readonly effective_from: Date,
    public readonly effective_to: Date | null,
    public readonly is_active: boolean,
  ) {}
}

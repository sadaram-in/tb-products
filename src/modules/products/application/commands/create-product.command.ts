// application/commands/create-product.command.ts

export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly changeLog: Record<string, any>,
    public readonly effective_from: Date,
    public readonly effective_to: Date | null,
    public readonly is_active: boolean,
  ) {}
}

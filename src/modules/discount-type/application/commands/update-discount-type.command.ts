// application/commands/create-product.command.ts

export class UpdateDiscountTypeCommand {
  constructor(
    public readonly id: string,
    public readonly type?: string,
  ) {}
}

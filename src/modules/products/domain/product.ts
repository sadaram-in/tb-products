export class Product {
  constructor(
    public id: string,
    public golden_id: string,
    public name: string,
    public description: string,
    public change_log: Record<string, any>,
    public effective_from: Date,
    public effective_to: Date | null,
    public is_active: boolean,
  ) {}
}

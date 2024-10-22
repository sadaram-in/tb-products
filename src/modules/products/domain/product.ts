export class Product {
  constructor(
    public id: string,
    public golden_id: string,
    public name: string,
    public description: string,
    public change_log: Record<string, any>,
    public start_date: Date,
    public end_date: Date | null,
    public is_active: boolean,
  ) {}
}

export class Discount {
  constructor(
    public id: string,
    public discount_type: string,
    public percentage: number,
    public start_date: Date,
    public end_date: Date | null,
  ) {}
}

export class ProductPricing {
  constructor(
    public id: string,
    public product_id: string,
    public price: number,
    public currency: string,
    public is_active: boolean,
    public start_date: Date,
    public end_date: Date | null,
    public eol_date: Date | null,
    public term_id: string,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}

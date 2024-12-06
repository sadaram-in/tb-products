export class UpdateProductCommand {
  constructor(
    public readonly id: string,
    public readonly businessId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly type: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly pricing: Array<{
      id?: string;
      price: number;
      currency: string;
      tierType: string;
      validFrom: Date;
      validTo: Date;
    }>,
    public readonly terms: Array<{
      id?: string;
      termPeriod: number;
      termUom: string;
      billingFrequency: string;
      trialPeriodDays?: number;
    }>,
  ) {}
}

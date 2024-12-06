export class CreateProductCommand {
  constructor(
    readonly businessId: string,
    readonly name: string,
    readonly description: string,
    readonly type: string,
    readonly startDate: Date,
    readonly endDate: Date,
    readonly pricing: Array<{
      price: number;
      currency: string;
      tierType: string;
      validFrom: Date;
      validTo: Date;
    }>,
    readonly terms: Array<{
      termPeriod: number;
      termUom: string;
      billingFrequency: string;
      trialPeriodDays?: number;
    }>,
  ) {}
}

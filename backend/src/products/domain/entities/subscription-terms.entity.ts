export enum TermUnit {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export enum BillingFrequency {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export class SubscriptionTerms {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly termPeriod: number,
    public readonly termUom: TermUnit,
    public readonly trialPeriodDays: number | null,
    public readonly billingFrequency: BillingFrequency,
    public readonly eolDate: Date | null,
    public readonly description?: string,
  ) {
    this.validateTermPeriod();
    this.validateTrialPeriod();
  }

  private validateTermPeriod(): void {
    if (this.termPeriod <= 0) {
      throw new Error('Term period must be positive');
    }
  }

  private validateTrialPeriod(): void {
    if (this.trialPeriodDays !== null && this.trialPeriodDays < 0) {
      throw new Error('Trial period days must be non-negative');
    }
  }

  public isValid(date: Date = new Date()): boolean {
    return !this.eolDate || date <= this.eolDate;
  }

  public getTermInDays(): number {
    switch (this.termUom) {
      case TermUnit.DAY:
        return this.termPeriod;
      case TermUnit.MONTH:
        return this.termPeriod * 30;
      case TermUnit.YEAR:
        return this.termPeriod * 365;
    }
  }
}

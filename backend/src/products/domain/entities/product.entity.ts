import { Price } from '../value-objects/price.vo';
import { ProductPricing } from './product-pricing.entity';
import { SubscriptionTerms } from './subscription-terms.entity';

export enum ProductType {
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export class Product {
  constructor(
    public readonly id: string,
    public readonly businessId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly metadata: Record<string, any>,
    public readonly type: ProductType,
    public readonly startDate: Date,
    public readonly endDate: Date,
    private readonly pricing: ProductPricing[] = [],
    private readonly subscriptionTerms: SubscriptionTerms[] = [],
  ) {
    this.validateDates();
    this.validateName();
  }

  private validateDates(): void {
    if (this.startDate > this.endDate) {
      throw new Error('Start date must be before or equal to end date');
    }
  }

  private validateName(): void {
    if (!this.name?.trim()) {
      throw new Error('Product name is required');
    }
  }

  public getPricing(): ProductPricing[] {
    return [...this.pricing];
  }

  public getSubscriptionTerms(): SubscriptionTerms[] {
    return [...this.subscriptionTerms];
  }

  public isActive(date: Date = new Date()): boolean {
    return date >= this.startDate && date <= this.endDate;
  }
}

export class CreateProductPricingDto {
    productId: string;
    price: number;
    currency: string;
    is_active: boolean;
    effective_from: Date;
    effective_to?: Date;
  }
  
  export class UpdateProductPricingDto {
    price?: number;
    currency?: string;
    is_active?: boolean;
    effective_from?: Date;
    effective_to?: Date;
  }
  
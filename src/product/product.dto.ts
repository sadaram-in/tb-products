export class CreateProductDto {
    name: string;
    description?: string;
    is_active: boolean;
    effective_from: Date;
    effective_to?: Date;
  }
  
  export class UpdateProductDto {
    name?: string;
    description?: string;
    is_active?: boolean;
    effective_from?: Date;
    effective_to?: Date;
  }
  
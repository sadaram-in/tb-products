# Product Management

## Project Structure

src/
├── products/ (✓)
│ ├── application/ (✓)
│ │ ├── commands/ (✓)
│ │ │ ├── create-product.command.ts (✓)
│ │ │ └── create-product.handler.ts (✓)
│ │ ├── queries/
│ │ │ ├── get-products.query.ts (✓)
│ │ │ └── get-products.handler.ts (✓)
│ │ └── ports/
│ │ │ └── product.repository.port.ts (✓)
│ ├── domain/
│ │ ├── entities/
│ │ │ ├── product.entity.ts (✓)
│ │ │ ├── product-pricing.entity.ts (✓)
│ │ │ └── subscription-terms.entity.ts (✓)
│ │ └── value-objects/
│ │ │ ├──price.vo.ts (✓)
│ ├── infrastructure/
│ │ ├── adapters/
│ │ │ └── product.repository.adapter.ts (✓)
│ │ └── persistence/
│ │ │ ├── typeorm/
│ │ │ │ └── entities/
│ │ │ │ │ └── product.entity.ts (✓)
│ │ │ │ │ └── product-pricing.entity.ts (✓)
│ │ │ │ │ └── subscription-terms.entity.ts (✓)
│ │ │ │ └── repositories/
│ │ │ │ │ └── product.repository.ts (✓)
│ └── presentation/
│ │ ├── controllers/
│ │ │ ├── product.controller.ts (✓)
│ │ ├── dtos/
│ │ │ ├──create-product.dto.ts (✓)
│ │ │ ├──product.response.dto.ts (✓)

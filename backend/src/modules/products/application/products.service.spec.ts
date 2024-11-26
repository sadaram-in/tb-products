import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ResponseService } from 'src/shared/response/response.service';
import { IProductRepository } from '../domain/ports/products.repository';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ResponseService,
          useValue: {},
        },
        {
          provide: CommandBus,
          useValue: {},
        },
        {
          provide: QueryBus,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

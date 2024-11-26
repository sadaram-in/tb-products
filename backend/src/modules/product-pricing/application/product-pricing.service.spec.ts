import { Test, TestingModule } from '@nestjs/testing';
import { ProductPricingService } from './product-pricing.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseService } from 'src/shared/response/response.service';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto';
import { statusCodes, responseCodesPRP } from 'src/shared/constants/constants';

describe('ProductPricingService', () => {
  let service: ProductPricingService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;
  let responseService: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductPricingService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ResponseService,
          useValue: {
            buildErrorResponse: jest.fn(),
            handleNotFound: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductPricingService>(ProductPricingService);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
    responseService = module.get<ResponseService>(ResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

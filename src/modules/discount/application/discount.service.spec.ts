import { Test, TestingModule } from '@nestjs/testing';
import { DiscountService } from './discount.service';
import { DiscountController } from '../presentation/http/discount.controller';

describe('DiscountController', () => {
  let controller: DiscountController;
  let service: DiscountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountController],
      providers: [
        {
          provide: DiscountService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DiscountController>(DiscountController);
    service = module.get<DiscountService>(DiscountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});

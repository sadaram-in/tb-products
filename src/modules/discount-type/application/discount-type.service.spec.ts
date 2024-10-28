import { Test, TestingModule } from '@nestjs/testing';
import {  DiscountTypeService } from './discount-type.service';
import { DiscountTypeController } from '../presentation/http/discount-type.controller';

describe('DiscountTypeController', () => {
  let controller: DiscountTypeController;
  let service: DiscountTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountTypeController],
      providers: [
        {
          provide: DiscountTypeService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DiscountTypeController>(DiscountTypeController);
    service = module.get<DiscountTypeService>(DiscountTypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});

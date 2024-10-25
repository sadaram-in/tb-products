import { Test, TestingModule } from '@nestjs/testing';
import { DiscountController } from './discount.controller';
import { DiscountService } from '../../application/discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto';
import {
  responseCodesDiscount,
  statusCodes,
} from 'src/shared/constants/constants';

describe('DiscountController', () => {
  let controller: DiscountController;
  let service: DiscountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountController],
      providers: [
        {
          provide: DiscountService,
          useValue: {
            findOne: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DiscountController>(DiscountController);
    service = module.get<DiscountService>(DiscountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a discount', async () => {
      const id = 'some-id';
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: {
          id,
          discount_type: 'type',
          percentage: 10,
          start_date: new Date(),
          end_date: new Date(),
        },
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesDiscount.SUCCESS,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of discounts', async () => {
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: [{ id: 'some-id', discount_type: 'type', percentage: 10 }],
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesDiscount.SUCCESS,
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a discount', async () => {
      const createDiscountDto: CreateDiscountDto = {
        discount_type: 'type',
        percentage: 10,
        start_date: new Date(),
        end_date: new Date(),
      };
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: { id: 'some-id', ...createDiscountDto },
        status_code: statusCodes.CREATED,
        response_code: responseCodesDiscount.SUCCESS,
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createDiscountDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a discount', async () => {
      const id = 'some-id';
      const updateDiscountDto: UpdateDiscountDto = {
        discount_type: 'new-type',
        percentage: 20,
      };
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: { id, ...updateDiscountDto },
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesDiscount.SUCCESS,
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, updateDiscountDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a discount', async () => {
      const id = 'some-id';
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: { message: 'Discount deleted successfully' },
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesDiscount.SUCCESS,
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toBe(result);
    });
  });
});

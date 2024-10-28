import { Test, TestingModule } from '@nestjs/testing';
import { DiscountTypeController } from './discount-type.controller';
import { DiscountTypeService } from '../../application/discount-type.service';
import { CreateDiscountTypeDto } from './dto/create-discount-type.dto';
import { UpdateDiscountTypeDto } from './dto/update-discount-type.dto';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto';
import {
  responseCodesDiscount,
  statusCodes,
} from 'src/shared/constants/constants';

describe('DiscountTypeController', () => {
  let controller: DiscountTypeController;
  let service: DiscountTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountTypeController],
      providers: [
        {
          provide: DiscountTypeService,
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

    controller = module.get<DiscountTypeController>(DiscountTypeController);
    service = module.get<DiscountTypeService>(DiscountTypeService);
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
      const createDiscountTypeDto: CreateDiscountTypeDto = {
        type: 'type',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: { id: 'some-id', ...createDiscountTypeDto },
        status_code: statusCodes.CREATED,
        response_code: responseCodesDiscount.SUCCESS,
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createDiscountTypeDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a discount', async () => {
      const id = 'some-id';
      const updateDiscountTypeDto: UpdateDiscountTypeDto = {
        type: 'new-type',
      };
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: { id, ...updateDiscountTypeDto },
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesDiscount.SUCCESS,
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, updateDiscountTypeDto)).toBe(result);
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

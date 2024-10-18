import { Test, TestingModule } from '@nestjs/testing';
import { ProductPricingController } from './product-pricing.controller';
import { ProductPricingService } from '../../application/product-pricing.service';
import { CreateProductPricingCommand } from '../../application/commands/create-product-pricing.command';
import { UpdateProductPricingCommand } from '../../application/commands/update-product-pricing.command';
import { CreateProductPricingDto } from './dto/create-product-pricing.dto';
import { UpdateProductPricingDto } from './dto/update-product-pricing.dto';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto';
import { statusCodes, responseCodesPR } from 'src/shared/constants/constants';

describe('ProductPricingController', () => {
  let controller: ProductPricingController;
  let service: ProductPricingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPricingController],
      providers: [
        {
          provide: ProductPricingService,
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

    controller = module.get<ProductPricingController>(ProductPricingController);
    service = module.get<ProductPricingService>(ProductPricingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a single product pricing', async () => {
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: { id: '1', price: 100 },
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesPR.SUCCESS,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('findAll', () => {
    it('should return an array of product pricings', async () => {
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: [
          { id: '1', price: 100 },
          { id: '2', price: 200 },
        ],
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesPR.SUCCESS,
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new product pricing', async () => {
      const dto: CreateProductPricingDto = {
        product_id: '1',
        price: 100,
        currency: 'USD',
        is_active: true,
        start_date: new Date(),
        end_date: null,
        eol_date: null,
        term: null,
      };
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: { id: '1', ...dto },
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesPR.SUCCESS,
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(
        expect.any(CreateProductPricingCommand),
      );
    });
  });

  describe('update', () => {
    it('should update a product pricing', async () => {
      const id = '1';
      const dto: UpdateProductPricingDto = {
        price: 150,
        currency: 'EUR',
        is_active: false,
        start_date: new Date(),
        end_date: null,
        eol_date: null,
        term: null,
      };
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: { id: '1', ...dto },
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesPR.SUCCESS,
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(
        id,
        expect.any(UpdateProductPricingCommand),
      );
    });
  });

  describe('remove', () => {
    it('should remove a product pricing', async () => {
      const result: ApiResponseDto<null> = {
        status: 'success',
        payload: null,
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesPR.SUCCESS,
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductPricingController } from './product-pricing.controller';
import { ProductPricingService } from '../../application/product-pricing.service';
import { CreateProductPricingDto } from './dto/create-product-pricing.dto';
import { UpdateProductPricingDto } from './dto/update-product-pricing.dto';
import { GetProductPricingDto } from './dto/get-product-pricing.dto';

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
            findById: jest.fn(),
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
    it('should call service.findOne with correct parameters', async () => {
      const product_id = 'some-product-id';
      const getProductPricingDto: GetProductPricingDto = {
        product_id: 'some-product-id',
        start_date: new Date(),
      };
      await controller.findOne(product_id, getProductPricingDto);
      expect(service.findOne).toHaveBeenCalledWith(
        product_id,
        getProductPricingDto.start_date,
      );
    });
  });

  describe('findById', () => {
    it('should call service.findById with correct id', async () => {
      const id = 'some-id';
      await controller.findById(id);
      expect(service.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call service.create with correct parameters', async () => {
      const createProductPricingDto: CreateProductPricingDto = {
        product_id: 'some-product-id',
        price: 100,
        currency: 'USD',
        is_active: true,
        start_date: new Date(),
        end_date: new Date(),
        eol_date: new Date(),
        term: 'some-term',
      };
      await controller.create(createProductPricingDto);
      expect(service.create).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('update', () => {
    it('should call service.update with correct parameters', async () => {
      const product_id = 'some-product-id';
      const updateProductPricingDto: UpdateProductPricingDto = {
        price: 150,
        currency: 'USD',
        start_date: new Date(),
        end_date: new Date(),
        eol_date: new Date(),
        term: 'updated-term',
      };
      await controller.update(product_id, updateProductPricingDto);
      expect(service.update).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('remove', () => {
    it('should call service.remove with correct id', async () => {
      const id = 'some-id';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});

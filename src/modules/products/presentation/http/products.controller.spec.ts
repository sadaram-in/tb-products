import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from 'src/modules/products/application/products.service';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto';
import { CreateProductDto } from './dto/create-product.dto';

import {
  statusCodes,
  responseCodesPR,
} from '../../../../shared/constants/constants';

describe('ProductController', () => {
  let controller: ProductsController;
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result: ApiResponseDto<any[]> = {
        status: 'success',
        payload: [
          { id: 1, name: 'Product 1' },
          { id: 2, name: 'Product 2' },
        ],
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesPR.SUCCESS,
      };
      jest.spyOn(productService, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  }); 

  describe('findOne', () => {
    it('should return a single product', async () => {
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: { id: 1, name: 'Product 1' },
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesPR.SUCCESS,
      };
      jest.spyOn(productService, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });

    it('should return not found for non-existent product', async () => {
      const result: ApiResponseDto<null> = {
        status: 'error',
        payload: null,
        status_code: statusCodes.NOT_FOUND,
        response_code: responseCodesPR.NOT_FOUND,
      };
      jest.spyOn(productService, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('999')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const newProduct: CreateProductDto = {
        name: 'New Product',
        golden_id: '123e4567-e89b-12d3-a456-426614174000',
        description: 'New Product Description',
        change_log: [],
        start_date: new Date(),
        end_date: new Date(),
        is_active: true,
      };
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: { id: 3, ...newProduct },
        status_code: statusCodes.CREATED,
        response_code: responseCodesPR.SUCCESS,
      };
      jest.spyOn(productService, 'create').mockResolvedValue(result);

      expect(await controller.create(newProduct)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const updatedProduct = { name: 'Updated Product', price: 19.99 };
      const result: ApiResponseDto<any> = {
        status: 'success',
        payload: { id: 1, ...updatedProduct },
        status_code: statusCodes.SUCCESS,
        response_code: responseCodesPR.SUCCESS,
      };
      jest.spyOn(productService, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updatedProduct)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const result: ApiResponseDto<null> = {
        status: 'success',
        payload: null,
        status_code: statusCodes.NO_CONTENT,
        response_code: responseCodesPR.SUCCESS,
      };
      jest.spyOn(productService, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateDummyDto } from './create-dummy.dto';
import { ApiResponseDto } from './shared/response/dto/api-response.dto';
import { ResponseService } from './shared/response/response.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ResponseService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return the result from appService.getHello()', () => {
      const result: ApiResponseDto<any> = {
        payload: { data: 'Hello World!' },
        status: 'success',
        status_code: 200,
        response_code: 200,
      };
      jest.spyOn(appService, 'getHello').mockImplementation(() => result);

      expect(appController.getHello()).toEqual(result);
    });
  });

  describe('postHello', () => {
    it('should return the result from appService.postHello()', () => {
      const createDummyDto: CreateDummyDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result: ApiResponseDto<any> = {
        payload: { data: 'Hello World!' },
        status: 'success',
        status_code: 200,
        response_code: 200,
      };
      jest.spyOn(appService, 'postHello').mockImplementation(() => result);

      expect(appController.postHello(createDummyDto)).toEqual(result);
    });
  });
});

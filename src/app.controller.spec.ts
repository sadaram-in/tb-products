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
      providers: [AppService,ResponseService],
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
        response_code: 200
      };
      jest.spyOn(appService, 'getHello').mockImplementation(() => result);

      expect(appController.getHello()).toEqual(result);
    });
  });

  describe('postHello', () => {
    it('should return "hi"', () => {
      const createDummyDto: CreateDummyDto = {
        email: '',
        password: '',
      }; // Add properties as needed
      const consoleSpy = jest.spyOn(console, 'log');

      expect(appController.postHello(createDummyDto)).toBe('hi');
      expect(consoleSpy).toHaveBeenCalledWith('Endpoint hit, returning hi');
    });
  });
});

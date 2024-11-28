import { Body, Controller, Get, Post, VERSION_NEUTRAL, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDummyDto } from './create-dummy.dto';
import { createLogger } from './shared/loggers/pino.logger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  private readonly logger = createLogger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    this.logger.info('Handling GET request to /');
    const result = this.appService.getHello();
    this.logger.info('Request completed', { response: result });
    return result;
  }

  @Post()
  postHello(@Body() createDummyDto: CreateDummyDto) {
    this.logger.info('Handling POST request to /', { payload: createDummyDto });
    return this.appService.postHello(createDummyDto);
  }
}
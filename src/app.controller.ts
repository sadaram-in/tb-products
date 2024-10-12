import { Body, Controller, Get, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDummyDto } from './create-dummy.dto';

@Controller({ version: VERSION_NEUTRAL })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Post()
  postHello(@Body() createDummyDto: CreateDummyDto) {
    console.log('Endpoint hit, returning hi');
    return 'hi';
  }
}

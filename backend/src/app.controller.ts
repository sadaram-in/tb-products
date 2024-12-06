import {
  Body,
  Controller,
  Get,
  Post,
  VERSION_NEUTRAL,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    const result = this.appService.getHello();
    return result;
  }
}

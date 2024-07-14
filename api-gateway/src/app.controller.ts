import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomLoggerService } from 'common/logger/logger.service';
import { ApiKeyGuard } from './guards/auth/auth.guard';
import { Public } from 'common/decorators';

interface HelloResponse {
  message: string;
}

@Controller()
@UseGuards(ApiKeyGuard)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Get('/')
  @Public()
  getGateway() {
    return this.appService.getGateway();
  }

  @Get('/getHello')
  getHello(): Promise<HelloResponse> {
    return this.appService.getHello();
  }

  @Get('/getGoodbye')
  getGoodbye() {
    return this.appService.getGoodbye();
  }
}

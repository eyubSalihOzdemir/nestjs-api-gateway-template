import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HelloService } from './hello.service';
import { CustomLoggerService } from '../common/logger.service';

interface HelloResponse {
  message: string;
}

@Controller()
export class HelloController {
  constructor(
    private readonly helloService: HelloService,
    private readonly logger: CustomLoggerService,
  ) {}

  // @Get()
  // sayHello(): string {
  //   return this.appService.sayHello().message;
  // }

  @GrpcMethod('HelloService', 'SayHello')
  sayHello(): HelloResponse {
    return this.helloService.sayHello();
  }
}

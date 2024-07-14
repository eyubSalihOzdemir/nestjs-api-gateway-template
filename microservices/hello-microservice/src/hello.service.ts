import { Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

interface HelloResponse {
  message: string;
}

@Injectable()
export class HelloService {
  private readonly logger = new Logger(HelloService.name);

  // getHello(): string {
  //   return 'Hello from the remote service!';
  // }
  @GrpcMethod('HelloService', 'SayHello')
  sayHello(): HelloResponse {
    return { message: 'Hello from the remote service using gRPC!' };
  }
}

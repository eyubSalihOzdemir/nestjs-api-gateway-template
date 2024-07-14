import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, map, Observable, throwError } from 'rxjs';
import { Logger } from '@nestjs/common';

interface HelloService {
  sayHello({}): Observable<{ message: string }>;
}

interface HelloResponse {
  message: string;
}

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);
  private helloService: HelloService;

  getGateway(): { message: string } {
    return { message: 'Gateway alive!' };
  }

  constructor(
    @Inject('SERVICE_HELLO')
    private readonly clientServiceHello: ClientGrpc,
    @Inject('SERVICE_GOODBYE')
    private readonly clientServiceGoodbye: ClientProxy,
  ) {}

  onModuleInit() {
    this.helloService =
      this.clientServiceHello.getService<HelloService>('HelloService');
  }

  async getHello(): Promise<HelloResponse> {
    try {
      const response = await lastValueFrom(this.helloService.sayHello({}));
      return response;
    } catch (error) {
      console.error('Error occurred in getHello:', error);
      throw error;
    }
  }

  async getGoodbye(): Promise<string> {
    const response = await lastValueFrom(
      this.clientServiceGoodbye.send<string>('getGoodbye', {}).pipe(
        // Map successful response to desired output
        map((data: string) => data),
        // Handle errors gracefully
        catchError((err) => {
          console.error('Error occurred:', err);
          return throwError(() => new Error('Failed to get goodbye message'));
        }),
      ),
    );

    return response;
  }
}

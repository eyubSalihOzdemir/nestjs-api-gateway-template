import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomLoggerService } from 'common/logger/logger.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE_HELLO',
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:3000',
          package: 'hello',
          protoPath: 'src/hello.proto',
        },
      },
      {
        name: 'SERVICE_GOODBYE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CustomLoggerService],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '127.0.0.1:3000',
        package: 'hello',
        protoPath: 'src/hello.proto',
      },
    },
  );

  await app.listen();
}
bootstrap();

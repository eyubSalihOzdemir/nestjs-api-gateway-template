import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';
import { CustomLoggerService } from 'common/logger.service';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService, CustomLoggerService],
})
export class AppModule {}

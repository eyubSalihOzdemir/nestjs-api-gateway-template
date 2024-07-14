import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGoodbye(): string {
    return 'Goodbye from the remote service!';
  }
}

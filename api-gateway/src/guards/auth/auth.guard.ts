import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'common/decorators';
import { CustomLoggerService } from 'common/logger/logger.service';

export interface ApiKey {
  apiKey: string;
}

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: CustomLoggerService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true; // Allow access if no API key is required
    }

    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key']; // Assuming the API key is in the 'x-api-key' header

    if (!apiKey || apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid or missing API key');
    }
    return true;
  }
}

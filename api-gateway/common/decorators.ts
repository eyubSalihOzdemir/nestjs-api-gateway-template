import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic'; // Key to store metadata

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

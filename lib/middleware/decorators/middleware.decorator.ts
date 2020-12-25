import { SetMetadata } from '@nestjs/common';

export const Middleware = (): ClassDecorator =>
  SetMetadata('TELEGRAF_MIDDLEWARE', true);

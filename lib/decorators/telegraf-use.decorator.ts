import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Registers a middleware.
 *
 * https://telegraf.js.org/#/?id=use
 */
export function TelegrafUse(): MethodDecorator {
  return SetMetadata(DECORATORS.USE, {});
}

import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Handler for /settings command.
 *
 * https://telegraf.js.org/#/?id=settings
 */
export function TelegrafSettings(): MethodDecorator {
  return SetMetadata(DECORATORS.SETTINGS, {});
}

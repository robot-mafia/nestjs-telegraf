import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Handler for /start command.
 *
 * https://telegraf.js.org/#/?id=start
 */
export function TelegrafStart(): MethodDecorator {
  return SetMetadata(DECORATORS.START, {});
}

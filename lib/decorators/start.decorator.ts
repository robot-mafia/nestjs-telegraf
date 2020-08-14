import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Handler for /start command.
 *
 * @see https://telegraf.js.org/#/?id=start
 */
export const Start = (): MethodDecorator => {
  return SetMetadata(DECORATORS.START, {});
};

/**
 * Handler for /start command.
 *
 * @see https://telegraf.js.org/#/?id=start
 * @deprecated since v2, use Start decorator instead.
 */
export const TelegrafStart = Start;

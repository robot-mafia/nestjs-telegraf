import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Registers a middleware.
 *
 * @see https://telegraf.js.org/#/?id=use
 */
export const Use = (): MethodDecorator => {
  return SetMetadata(DECORATORS.USE, {});
};

/**
 * Registers a middleware.
 *
 * @see https://telegraf.js.org/#/?id=use
 * @deprecated since v2, use Use decorator instead.
 */
export const TelegrafUse = Use;

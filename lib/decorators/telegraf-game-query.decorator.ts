import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Registers middleware for handling callback_data actions with game query.
 *
 * https://telegraf.js.org/#/?id=inlinequery
 */
export function TelegrafGameQuery(): MethodDecorator {
  return SetMetadata(DECORATORS.GAME_QUERY, {});
}

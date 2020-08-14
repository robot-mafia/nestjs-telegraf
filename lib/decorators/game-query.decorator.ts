import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Registers middleware for handling callback_data actions with game query.
 *
 * @see https://telegraf.js.org/#/?id=inlinequery
 */
export const GameQuery = (): MethodDecorator => {
  return SetMetadata(DECORATORS.GAME_QUERY, {});
};

/**
 * Registers middleware for handling callback_data actions with game query.
 *
 * @see https://telegraf.js.org/#/?id=inlinequery
 * @deprecated since v2, use Action decorator instead.
 */
export const TelegrafGameQuery = GameQuery;

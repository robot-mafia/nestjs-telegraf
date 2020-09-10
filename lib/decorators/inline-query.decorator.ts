import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';
import * as tt from 'telegraf/typings/telegram-types';

export type TelegrafInlineQueryTriggers = string | string[] | RegExp | RegExp[];

export interface InlineQueryOptions {
  triggers?: TelegrafInlineQueryTriggers;
  updateType:
    | tt.UpdateType
    | tt.UpdateType[]
    | tt.MessageSubTypes
    | tt.MessageSubTypes[];
}

/**
 * Registers middleware for handling inline_query actions with regular expressions.
 *
 * @see https://telegraf.js.org/#/?id=inlinequery
 */
export const InlineQuery = (
  triggers?: TelegrafInlineQueryTriggers,
): MethodDecorator => {
  return SetMetadata(DECORATORS.INLINE_QUERY, {
    triggers,
    updateType: 'inline_query',
  });
};

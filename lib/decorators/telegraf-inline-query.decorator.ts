import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type TelegrafInlineQueryTriggers = string | string[] | RegExp | RegExp[];

export interface TelegrafInlineQueryMetadata {
  triggers: TelegrafInlineQueryTriggers;
}

/**
 * Registers middleware for handling inline_query actions with regular expressions.
 * @param triggers Triggers
 *
 * https://telegraf.js.org/#/?id=inlinequery
 */
export function TelegrafInlineQuery(
  triggers: TelegrafInlineQueryTriggers,
): MethodDecorator {
  return SetMetadata(DECORATORS.INLINE_QUERY, { triggers });
}

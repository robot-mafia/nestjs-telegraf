import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type Triggers = string | string[] | RegExp | RegExp[];

/**
 * Registers middleware for handling inline_query actions with regular expressions.
 * @param triggers Triggers
 *
 * https://telegraf.js.org/#/?id=inlinequery
 */
export function TelegrafInlineQuery(triggers: Triggers): MethodDecorator {
  return SetMetadata(DECORATORS.INLINE_QUERY, { triggers });
}

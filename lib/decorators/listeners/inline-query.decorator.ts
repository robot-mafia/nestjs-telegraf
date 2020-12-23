import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
import { TelegrafInlineQueryTriggers } from '../../telegraf.types';

export interface InlineQueryOptions {
  triggers: TelegrafInlineQueryTriggers;
}

/**
 * Registers middleware for handling inline_query actions with regular expressions.
 *
 * @see https://telegraf.js.org/#/?id=inlinequery
 */
export const InlineQuery = (
  triggers: TelegrafInlineQueryTriggers,
): MethodDecorator => {
  return applyDecorators(
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.InlineQuery),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      triggers,
    } as InlineQueryOptions),
  );
};

import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  UPDATE_LISTENER_OPTIONS_METADATA,
  UPDATE_LISTENER_TYPE_METADATA,
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
    SetMetadata(UPDATE_LISTENER_TYPE_METADATA, ListenerType.InlineQuery),
    SetMetadata(UPDATE_LISTENER_OPTIONS_METADATA, {
      triggers,
    } as InlineQueryOptions),
  );
};

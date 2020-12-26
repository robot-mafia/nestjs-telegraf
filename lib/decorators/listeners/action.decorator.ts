import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  LISTENER_OPTIONS_METADATA,
  LISTENER_TYPE_METADATA,
} from '../../telegraf.constants';
import { TelegrafActionTriggers } from '../../telegraf.types';
import { ListenerType } from '../../enums/listener-type.enum';

export interface ActionOptions {
  triggers: TelegrafActionTriggers;
}

/**
 * Registers middleware for handling callback_data actions with regular expressions.
 *
 * @see https://telegraf.js.org/#/?id=action
 */
export const Action = (triggers: TelegrafActionTriggers): MethodDecorator => {
  return applyDecorators(
    SetMetadata(LISTENER_TYPE_METADATA, ListenerType.Action),
    SetMetadata(LISTENER_OPTIONS_METADATA, {
      triggers,
    } as ActionOptions),
  );
};

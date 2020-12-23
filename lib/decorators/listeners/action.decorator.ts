import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
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
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Action),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      triggers,
    } as ActionOptions),
  );
};

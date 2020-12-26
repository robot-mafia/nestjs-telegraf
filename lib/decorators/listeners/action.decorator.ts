import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  UPDATE_LISTENER_OPTIONS_METADATA,
  UPDATE_LISTENER_TYPE_METADATA,
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
    SetMetadata(UPDATE_LISTENER_TYPE_METADATA, ListenerType.Action),
    SetMetadata(UPDATE_LISTENER_OPTIONS_METADATA, {
      triggers,
    } as ActionOptions),
  );
};

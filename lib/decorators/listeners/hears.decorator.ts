import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  UPDATE_LISTENER_OPTIONS_METADATA,
  UPDATE_LISTENER_TYPE_METADATA,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums';
import { TelegrafHearsTriggers } from '../../telegraf.types';

export interface HearsOptions {
  triggers: TelegrafHearsTriggers;
}

/**
 * Registers middleware for handling text messages.
 *
 * @see https://telegraf.js.org/#/?id=hears
 */
export const Hears = (triggers: TelegrafHearsTriggers): MethodDecorator => {
  return applyDecorators(
    SetMetadata(UPDATE_LISTENER_TYPE_METADATA, ListenerType.Hears),
    SetMetadata(UPDATE_LISTENER_OPTIONS_METADATA, {
      triggers,
    } as HearsOptions),
  );
};

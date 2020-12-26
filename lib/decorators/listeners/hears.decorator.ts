import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  LISTENER_OPTIONS_METADATA,
  LISTENER_TYPE_METADATA,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
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
    SetMetadata(LISTENER_TYPE_METADATA, ListenerType.Hears),
    SetMetadata(LISTENER_OPTIONS_METADATA, {
      triggers,
    } as HearsOptions),
  );
};

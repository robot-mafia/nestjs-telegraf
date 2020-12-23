import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
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
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Hears),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      triggers,
    } as HearsOptions),
  );
};

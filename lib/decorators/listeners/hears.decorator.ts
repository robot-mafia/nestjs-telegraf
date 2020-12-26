import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  UPDATE_LISTENER_OPTIONS_METADATA,
  UPDATE_LISTENER_METHOD_METADATA,
} from '../../telegraf.constants';
import { ListenerMethod } from '../../enums';
import { TelegrafHearsTriggers } from '../../telegraf.types';

/**
 * Registers middleware for handling text messages.
 *
 * @see https://telegraf.js.org/#/?id=hears
 */
export const Hears = (triggers: TelegrafHearsTriggers): MethodDecorator => {
  return applyDecorators(
    SetMetadata(UPDATE_LISTENER_METHOD_METADATA, ListenerMethod.Hears),
    SetMetadata(UPDATE_LISTENER_OPTIONS_METADATA, [triggers]),
  );
};

import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  UPDATE_LISTENER_OPTIONS_METADATA,
  UPDATE_LISTENER_METHOD_METADATA,
} from '../../telegraf.constants';
import { ListenerMethod } from '../../enums';
import { TelegrafPhone } from '../../telegraf.types';

/**
 * Phone number handling.
 *
 * @see https://telegraf.js.org/#/?id=phone
 */
export const Phone = (phone: TelegrafPhone): MethodDecorator => {
  return applyDecorators(
    SetMetadata(UPDATE_LISTENER_METHOD_METADATA, ListenerMethod.Phone),
    SetMetadata(UPDATE_LISTENER_OPTIONS_METADATA, [phone]),
  );
};

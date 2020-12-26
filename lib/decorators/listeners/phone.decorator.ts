import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  LISTENER_OPTIONS_METADATA,
  LISTENER_TYPE_METADATA,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
import { TelegrafPhone } from '../../telegraf.types';

export interface PhoneOptions {
  phone: TelegrafPhone;
}

/**
 * Phone number handling.
 *
 * @see https://telegraf.js.org/#/?id=phone
 */
export const Phone = (phone: TelegrafPhone): MethodDecorator => {
  return applyDecorators(
    SetMetadata(LISTENER_TYPE_METADATA, ListenerType.Phone),
    SetMetadata(LISTENER_OPTIONS_METADATA, {
      phone,
    } as PhoneOptions),
  );
};

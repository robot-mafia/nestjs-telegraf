import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
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
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Phone),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      phone,
    } as PhoneOptions),
  );
};

import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type TelegrafPhonePhone = string | string[];

export interface TelegrafPhoneMetadata {
  phone: TelegrafPhonePhone;
}

/**
 * Phone number handling.
 * @param phone Phone number
 *
 * https://telegraf.js.org/#/?id=phone
 */
export function TelegrafPhone(phone: TelegrafPhonePhone): MethodDecorator {
  return SetMetadata(DECORATORS.PHONE, { phone });
}

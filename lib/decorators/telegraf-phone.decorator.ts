import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Phone number handling.
 * @param phone Phone number
 *
 * https://telegraf.js.org/#/?id=phone
 */
export function TelegrafPhone(phone: string | string[]): MethodDecorator {
  return SetMetadata(DECORATORS.PHONE, { phone });
}

import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
import { TelegrafEmail } from '../../telegraf.types';

export interface EmailOptions {
  email: TelegrafEmail;
}

/**
 * Registers middleware for handling messages with email entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-email
 */
export const Email = (email: TelegrafEmail): MethodDecorator => {
  return applyDecorators(
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Email),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      email,
    } as EmailOptions),
  );
};

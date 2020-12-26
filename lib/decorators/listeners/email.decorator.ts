import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  LISTENER_OPTIONS_METADATA,
  LISTENER_TYPE_METADATA,
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
    SetMetadata(LISTENER_TYPE_METADATA, ListenerType.Email),
    SetMetadata(LISTENER_OPTIONS_METADATA, {
      email,
    } as EmailOptions),
  );
};

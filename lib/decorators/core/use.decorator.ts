import { SetMetadata } from '@nestjs/common';
import { LISTENER_TYPE_METADATA } from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';

/**
 * Registers a middleware.
 *
 * @see https://telegraf.js.org/#/?id=use
 */
export const Use = (): MethodDecorator => {
  return SetMetadata(LISTENER_TYPE_METADATA, ListenerType.Use);
};

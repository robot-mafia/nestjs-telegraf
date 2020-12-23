import { SetMetadata } from '@nestjs/common';
import { TELEGRAF_LISTENER_TYPE } from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';

/**
 * Registers a middleware.
 *
 * @see https://telegraf.js.org/#/?id=use
 */
export const Use = (): MethodDecorator => {
  return SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Use);
};

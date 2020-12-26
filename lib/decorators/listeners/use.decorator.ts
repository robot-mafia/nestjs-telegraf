import { SetMetadata } from '@nestjs/common';
import { UPDATE_LISTENER_METHOD_METADATA } from '../../telegraf.constants';
import { ListenerMethod } from '../../enums';

/**
 * Registers a middleware.
 *
 * @see https://telegraf.js.org/#/?id=use
 */
export const Use = (): MethodDecorator => {
  return SetMetadata(UPDATE_LISTENER_METHOD_METADATA, ListenerMethod.Use);
};

import { SetMetadata } from '@nestjs/common';
import { UPDATE_LISTENER_METHOD_METADATA } from '../../telegraf.constants';
import { ListenerMethod } from '../../enums';

/**
 * Handler for /start command.
 *
 * @see https://telegraf.js.org/#/?id=start
 */
export const Start = (): MethodDecorator => {
  return SetMetadata(UPDATE_LISTENER_METHOD_METADATA, ListenerMethod.Start);
};

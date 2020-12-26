import { SetMetadata } from '@nestjs/common';
import { UPDATE_LISTENER_METHOD_METADATA } from '../../telegraf.constants';
import { ListenerMethod } from '../../enums';

/**
 * Handler for /settings command.
 *
 * @see https://telegraf.js.org/#/?id=settings
 */
export const Settings = (): MethodDecorator => {
  return SetMetadata(UPDATE_LISTENER_METHOD_METADATA, ListenerMethod.Settings);
};

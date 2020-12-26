import { SetMetadata } from '@nestjs/common';
import { UPDATE_LISTENER_TYPE_METADATA } from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';

/**
 * Handler for /settings command.
 *
 * @see https://telegraf.js.org/#/?id=settings
 */
export const Settings = (): MethodDecorator => {
  return SetMetadata(UPDATE_LISTENER_TYPE_METADATA, ListenerType.Settings);
};

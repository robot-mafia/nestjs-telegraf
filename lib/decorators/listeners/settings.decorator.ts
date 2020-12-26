import { SetMetadata } from '@nestjs/common';
import { LISTENER_TYPE_METADATA } from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';

/**
 * Handler for /settings command.
 *
 * @see https://telegraf.js.org/#/?id=settings
 */
export const Settings = (): MethodDecorator => {
  return SetMetadata(LISTENER_TYPE_METADATA, ListenerType.Settings);
};

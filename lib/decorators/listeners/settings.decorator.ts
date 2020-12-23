import { SetMetadata } from '@nestjs/common';
import { TELEGRAF_LISTENER_TYPE } from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';

/**
 * Handler for /settings command.
 *
 * @see https://telegraf.js.org/#/?id=settings
 */
export const Settings = (): MethodDecorator => {
  return SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Settings);
};

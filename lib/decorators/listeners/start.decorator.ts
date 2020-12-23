import { SetMetadata } from '@nestjs/common';
import { TELEGRAF_LISTENER_TYPE } from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';

/**
 * Handler for /start command.
 *
 * @see https://telegraf.js.org/#/?id=start
 */
export const Start = (): MethodDecorator => {
  return SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Start);
};

import { SetMetadata } from '@nestjs/common';
import { LISTENER_TYPE_METADATA } from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';

/**
 * Handler for /start command.
 *
 * @see https://telegraf.js.org/#/?id=start
 */
export const Start = (): MethodDecorator => {
  return SetMetadata(LISTENER_TYPE_METADATA, ListenerType.Start);
};

import { SetMetadata } from '@nestjs/common';
import { TELEGRAF_LISTENER_TYPE } from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';

/**
 * Handler for /help command.
 *
 * @see https://telegraf.js.org/#/?id=help
 */
export const Help = (): MethodDecorator => {
  return SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Help);
};

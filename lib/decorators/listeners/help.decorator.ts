import { SetMetadata } from '@nestjs/common';
import { UPDATE_LISTENER_TYPE_METADATA } from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';

/**
 * Handler for /help command.
 *
 * @see https://telegraf.js.org/#/?id=help
 */
export const Help = (): MethodDecorator => {
  return SetMetadata(UPDATE_LISTENER_TYPE_METADATA, ListenerType.Help);
};

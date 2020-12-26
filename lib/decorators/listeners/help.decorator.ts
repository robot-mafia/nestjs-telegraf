import { SetMetadata } from '@nestjs/common';
import { UPDATE_LISTENER_METHOD_METADATA } from '../../telegraf.constants';
import { ListenerMethod } from '../../enums';

/**
 * Handler for /help command.
 *
 * @see https://telegraf.js.org/#/?id=help
 */
export const Help = (): MethodDecorator => {
  return SetMetadata(UPDATE_LISTENER_METHOD_METADATA, ListenerMethod.Help);
};

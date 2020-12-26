import { SetMetadata } from '@nestjs/common';
import { UPDATE_LISTENER_METHOD_METADATA } from '../../telegraf.constants';
import { ListenerMethod } from '../../enums';

/**
 * Registers middleware for handling callback_data actions with game query.
 *
 * @see https://telegraf.js.org/#/?id=inlinequery
 */
export const GameQuery = (): MethodDecorator => {
  return SetMetadata(UPDATE_LISTENER_METHOD_METADATA, ListenerMethod.GameQuery);
};

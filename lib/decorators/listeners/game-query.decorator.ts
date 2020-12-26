import { SetMetadata } from '@nestjs/common';
import { UPDATE_LISTENER_TYPE_METADATA } from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';

/**
 * Registers middleware for handling callback_data actions with game query.
 *
 * @see https://telegraf.js.org/#/?id=inlinequery
 */
export const GameQuery = (): MethodDecorator => {
  return SetMetadata(UPDATE_LISTENER_TYPE_METADATA, ListenerType.GameQuery);
};

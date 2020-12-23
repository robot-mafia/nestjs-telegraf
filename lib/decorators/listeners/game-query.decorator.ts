import { SetMetadata } from '@nestjs/common';
import { TELEGRAF_LISTENER_TYPE } from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';

/**
 * Registers middleware for handling callback_data actions with game query.
 *
 * @see https://telegraf.js.org/#/?id=inlinequery
 */
export const GameQuery = (): MethodDecorator => {
  return SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.GameQuery);
};

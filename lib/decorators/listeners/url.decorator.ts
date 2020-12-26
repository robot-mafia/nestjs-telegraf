import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  UPDATE_LISTENER_OPTIONS_METADATA,
  UPDATE_LISTENER_METHOD_METADATA,
} from '../../telegraf.constants';
import { ListenerMethod } from '../../enums';
import { TelegrafUrl } from '../../telegraf.types';

/**
 * Registers middleware for handling messages with url entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-url
 */
export const Url = (url: TelegrafUrl): MethodDecorator => {
  return applyDecorators(
    SetMetadata(UPDATE_LISTENER_METHOD_METADATA, ListenerMethod.Url),
    SetMetadata(UPDATE_LISTENER_OPTIONS_METADATA, [url]),
  );
};

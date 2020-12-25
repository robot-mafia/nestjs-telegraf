import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
import { TelegrafUrl } from '../../telegraf.types';

export interface UrlOptions {
  url: TelegrafUrl;
}

/**
 * Registers middleware for handling messages with url entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-url
 */
export const Url = (url: TelegrafUrl): MethodDecorator => {
  return applyDecorators(
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Url),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      url,
    } as UrlOptions),
  );
};

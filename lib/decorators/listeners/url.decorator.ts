import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  LISTENER_OPTIONS_METADATA,
  LISTENER_TYPE_METADATA,
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
    SetMetadata(LISTENER_TYPE_METADATA, ListenerType.Url),
    SetMetadata(LISTENER_OPTIONS_METADATA, {
      url,
    } as UrlOptions),
  );
};

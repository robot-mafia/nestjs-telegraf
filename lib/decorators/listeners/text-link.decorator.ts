import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
import { TelegrafTextLink } from '../../telegraf.types';

export interface TextLinkOptions {
  link: TelegrafTextLink;
}

/**
 * Registers middleware for handling messages with text_link entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-textlink
 */
export const TetxLink = (link: TelegrafTextLink): MethodDecorator => {
  return applyDecorators(
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.TextLink),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      link,
    } as TextLinkOptions),
  );
};

import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  LISTENER_OPTIONS_METADATA,
  LISTENER_TYPE_METADATA,
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
    SetMetadata(LISTENER_TYPE_METADATA, ListenerType.TextLink),
    SetMetadata(LISTENER_OPTIONS_METADATA, {
      link,
    } as TextLinkOptions),
  );
};

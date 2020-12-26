import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  LISTENER_OPTIONS_METADATA,
  LISTENER_TYPE_METADATA,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
import { TelegrafTextMention } from '../../telegraf.types';

export interface TextMentionOptions {
  mention: TelegrafTextMention;
}

/**
 * Registers middleware for handling messages with text_mention entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-textlink
 */
export const TetxMention = (mention: TelegrafTextMention): MethodDecorator => {
  return applyDecorators(
    SetMetadata(LISTENER_TYPE_METADATA, ListenerType.TextMention),
    SetMetadata(LISTENER_OPTIONS_METADATA, {
      mention,
    } as TextMentionOptions),
  );
};

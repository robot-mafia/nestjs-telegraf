import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
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
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.TextMention),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      mention,
    } as TextMentionOptions),
  );
};

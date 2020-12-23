import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
import { TelegrafMention } from '../../telegraf.types';

export interface MentionOptions {
  mention: TelegrafMention;
}

/**
 * Mention handling.
 *
 * @see https://telegraf.js.org/#/?id=mention
 */
export const Mention = (mention: TelegrafMention): MethodDecorator => {
  return applyDecorators(
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Mention),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      mention,
    } as MentionOptions),
  );
};

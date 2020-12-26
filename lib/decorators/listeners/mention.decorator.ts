import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  UPDATE_LISTENER_OPTIONS_METADATA,
  UPDATE_LISTENER_TYPE_METADATA,
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
    SetMetadata(UPDATE_LISTENER_TYPE_METADATA, ListenerType.Mention),
    SetMetadata(UPDATE_LISTENER_OPTIONS_METADATA, {
      mention,
    } as MentionOptions),
  );
};

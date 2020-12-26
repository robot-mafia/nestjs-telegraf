import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  LISTENER_OPTIONS_METADATA,
  LISTENER_TYPE_METADATA,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
import { TelegrafHashtag } from '../../telegraf.types';

export interface HashtagOptions {
  hashtag: TelegrafHashtag;
}

/**
 * Hashtag handling.
 *
 * @see https://telegraf.js.org/#/?id=hashtag
 */
export const Hashtag = (hashtag: TelegrafHashtag): MethodDecorator => {
  return applyDecorators(
    SetMetadata(LISTENER_TYPE_METADATA, ListenerType.Hashtag),
    SetMetadata(LISTENER_OPTIONS_METADATA, {
      hashtag,
    } as HashtagOptions),
  );
};

import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
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
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Hashtag),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      hashtag,
    } as HashtagOptions),
  );
};

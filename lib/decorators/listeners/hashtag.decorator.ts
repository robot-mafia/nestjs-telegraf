import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  UPDATE_LISTENER_OPTIONS_METADATA,
  UPDATE_LISTENER_TYPE_METADATA,
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
    SetMetadata(UPDATE_LISTENER_TYPE_METADATA, ListenerType.Hashtag),
    SetMetadata(UPDATE_LISTENER_OPTIONS_METADATA, {
      hashtag,
    } as HashtagOptions),
  );
};

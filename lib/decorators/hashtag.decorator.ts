import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type TelegrafHashtagHashtag = string | string[];

export interface HashtagOptions {
  hashtag: TelegrafHashtagHashtag;
}

/**
 * Hashtag handling.
 *
 * @see https://telegraf.js.org/#/?id=hashtag
 */
export const Hashtag = (hashtag: TelegrafHashtagHashtag): MethodDecorator => {
  return SetMetadata(DECORATORS.HASHTAG, { hashtag });
};

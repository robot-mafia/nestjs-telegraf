import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type TelegrafHashtagHashtag = string | string[];

export interface TelegrafHashtagMetadata {
  hashtag: TelegrafHashtagHashtag;
}

/**
 * Hashtag handling.
 * @param hashtag Hashtag
 *
 * https://telegraf.js.org/#/?id=hashtag
 */
export function TelegrafHashtag(
  hashtag: TelegrafHashtagHashtag,
): MethodDecorator {
  return SetMetadata(DECORATORS.HASHTAG, { hashtag });
}

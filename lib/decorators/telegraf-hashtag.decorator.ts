import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Hashtag handling.
 * @param hashtag Hashtag
 *
 * https://telegraf.js.org/#/?id=hashtag
 */
export function TelegrafHashtag(hashtag: string | string[]): MethodDecorator {
  return SetMetadata(DECORATORS.HASHTAG, { hashtag });
}

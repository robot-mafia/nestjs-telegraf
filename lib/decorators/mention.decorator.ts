import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type TelegrafMentionUsername = string | string[];

export interface MentionOptions {
  username: TelegrafMentionUsername;
}

/**
 * Mention handling.
 *
 * @see https://telegraf.js.org/#/?id=mention
 */
export const Mention = (username: TelegrafMentionUsername): MethodDecorator => {
  return SetMetadata(DECORATORS.MENTION, { username });
};

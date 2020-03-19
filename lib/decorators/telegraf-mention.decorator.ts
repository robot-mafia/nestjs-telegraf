import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type TelegrafMentionUsername = string | string[];

export interface TelegrafMentionMetadata {
  username: TelegrafMentionUsername;
}

/**
 * Mention handling.
 * @param username Username
 *
 * https://telegraf.js.org/#/?id=mention
 */
export function TelegrafMention(
  username: TelegrafMentionUsername,
): MethodDecorator {
  return SetMetadata(DECORATORS.MENTION, { username });
}

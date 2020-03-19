import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Mention handling.
 * @param username Username
 *
 * https://telegraf.js.org/#/?id=mention
 */
export function TelegrafMention(username: string | string[]): MethodDecorator {
  return SetMetadata(DECORATORS.MENTION, { username });
}

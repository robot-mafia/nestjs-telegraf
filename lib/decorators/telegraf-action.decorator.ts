import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';
import { HearsTriggers } from 'telegraf';

export type TelegrafActionTriggers = HearsTriggers;

export interface TelegrafActionMetadata {
  triggers: TelegrafActionTriggers;
}

/**
 * Registers middleware for handling callback_data actions with regular expressions.
 * @param triggers Triggers
 *
 * https://telegraf.js.org/#/?id=action
 */
export function TelegrafAction(
  triggers: TelegrafActionTriggers,
): MethodDecorator {
  return SetMetadata(DECORATORS.ACTION, { triggers });
}

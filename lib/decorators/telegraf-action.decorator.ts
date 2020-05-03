import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';
import { HearsTriggers } from 'telegraf/typings/composer';
import { Context } from '../interfaces';

export type TelegrafActionTriggers = HearsTriggers<Context>;

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

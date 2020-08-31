import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';
import { HearsTriggers } from 'telegraf/typings/composer';
import { Context } from '../interfaces';

export type TelegrafActionTriggers = HearsTriggers<Context>;

export interface ActionOptions {
  triggers: TelegrafActionTriggers;
}

/**
 * Registers middleware for handling callback_data actions with regular expressions.
 *
 * @see https://telegraf.js.org/#/?id=action
 */
export const Action = (triggers: TelegrafActionTriggers): MethodDecorator => {
  return SetMetadata(DECORATORS.ACTION, { triggers });
};

import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';
import { HearsTriggers } from 'telegraf/typings/composer';
import { Context } from '../interfaces';

export type TelegrafHearsTriggers = HearsTriggers<Context>;

export interface HearsOptions {
  triggers: TelegrafHearsTriggers;
}

/**
 * Registers middleware for handling text messages.
 *
 * @see https://telegraf.js.org/#/?id=hears
 */
export const Hears = (triggers: TelegrafHearsTriggers): MethodDecorator => {
  return SetMetadata(DECORATORS.HEARS, { triggers: triggers });
};

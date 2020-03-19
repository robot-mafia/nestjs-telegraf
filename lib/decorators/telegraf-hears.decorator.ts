import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';
import { HearsTriggers } from 'telegraf';

/**
 * Registers middleware for handling text messages.
 * @param triggers Triggers
 *
 * https://telegraf.js.org/#/?id=hears
 */
export function TelegrafHears(triggers: HearsTriggers): MethodDecorator {
  return SetMetadata(DECORATORS.HEARS, { triggers: triggers });
}

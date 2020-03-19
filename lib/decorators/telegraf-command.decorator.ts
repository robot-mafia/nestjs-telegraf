import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type TelegrafCommandCommands = string | string[];

export interface TelegrafCommandMetadata {
  commands: TelegrafCommandCommands;
}

/**
 * Command handling.
 * @param commands Commands
 *
 * https://telegraf.js.org/#/?id=command
 */
export function TelegrafCommand(
  commands: TelegrafCommandCommands,
): MethodDecorator {
  return SetMetadata(DECORATORS.COMMAND, { commands });
}

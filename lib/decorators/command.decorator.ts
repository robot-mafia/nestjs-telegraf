import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type TelegrafCommandCommands = string | string[];

export interface CommandOptions {
  commands: TelegrafCommandCommands;
}

/**
 * Command handling.
 *
 * @see https://telegraf.js.org/#/?id=command
 */
export const Command = (commands: TelegrafCommandCommands): MethodDecorator => {
  return SetMetadata(DECORATORS.COMMAND, { commands });
};

/**
 * Command handling.
 *
 * @see https://telegraf.js.org/#/?id=command
 * @deprecated since v2, use Command decorator instead.
 */
export const TelegrafCommand = Command;

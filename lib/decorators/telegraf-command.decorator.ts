import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Command handling.
 * @param commands Commands
 *
 * https://telegraf.js.org/#/?id=command
 */
export function TelegrafCommand(commands: string | string[]): MethodDecorator {
  return SetMetadata(DECORATORS.COMMAND, { commands });
}

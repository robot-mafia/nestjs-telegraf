import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Handler for /help command.
 *
 * https://telegraf.js.org/#/?id=help
 */
export function TelegrafHelp(): MethodDecorator {
  return SetMetadata(DECORATORS.HELP, {});
}

import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Handler for /help command.
 *
 * @see https://telegraf.js.org/#/?id=help
 */
export const Help = (): MethodDecorator => {
  return SetMetadata(DECORATORS.HELP, {});
};

/**
 * Handler for /help command.
 *
 * @see https://telegraf.js.org/#/?id=help
 * @deprecated since v2, use Help decorator instead.
 */
export const TelegrafHelp = Help;

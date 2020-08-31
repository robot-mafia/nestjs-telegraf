import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Handler for /settings command.
 *
 * @see https://telegraf.js.org/#/?id=settings
 */
export const Settings = (): MethodDecorator => {
  return SetMetadata(DECORATORS.SETTINGS, {});
};

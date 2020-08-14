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

/**
 * Handler for /settings command.
 *
 * @see https://telegraf.js.org/#/?id=settings
 * @deprecated since v2, use Settings decorator instead.
 */
export const TelegrafSettings = Settings;

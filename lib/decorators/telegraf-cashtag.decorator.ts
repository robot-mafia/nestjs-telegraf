import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * Cashtag handling.
 * @param cashtag Cashtag
 *
 * https://telegraf.js.org/#/?id=cashtag
 */
export function TelegrafCashtag(cashtag: string | string[]): MethodDecorator {
  return SetMetadata(DECORATORS.CASHTAG, { cashtag });
}

import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type TelegrafCashtagCashtag = string | string[];

export interface TelegrafCashtagMetadata {
  cashtag: TelegrafCashtagCashtag;
}

/**
 * Cashtag handling.
 * @param cashtag Cashtag
 *
 * https://telegraf.js.org/#/?id=cashtag
 */
export function TelegrafCashtag(
  cashtag: TelegrafCashtagCashtag,
): MethodDecorator {
  return SetMetadata(DECORATORS.CASHTAG, { cashtag });
}

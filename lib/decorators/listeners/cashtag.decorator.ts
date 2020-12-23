import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
} from '../../telegraf.constants';
import { TelegrafCashtag } from '../../telegraf.types';
import { ListenerType } from '../../enums/listener-type.enum';

export interface CashtagOptions {
  cashtag: TelegrafCashtag;
}

/**
 * Cashtag handling.
 *
 * @see https://telegraf.js.org/#/?id=cashtag
 */
export const Cashtag = (cashtag: TelegrafCashtag): MethodDecorator => {
  return applyDecorators(
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Cashtag),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      cashtag,
    } as CashtagOptions),
  );
};
